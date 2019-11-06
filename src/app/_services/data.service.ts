import {
  Injectable
}
from '@angular/core';
import {
  HttpClient, HttpHeaders
}
from '@angular/common/http';
import {
  environment
}
from '../../environments/environment';
import {
  Md5
}
from "md5-typescript";
import {
  Subject, BehaviorSubject, Observable, throwError
}
from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  api_url;
  base_url;

  public changeSub = new Subject < string > ();
  public storageSub = new Subject < string > ()

  private inputData = new BehaviorSubject < any > (null);
  public inputData$ = this.inputData.asObservable();

  private inputData1 = new BehaviorSubject < any > (null);
  public inputData1$ = this.inputData1.asObservable();

  constructor(private http: HttpClient, ) {
      this.api_url = environment.api_url;
      this.base_url = environment.base_url;
  }

  guid() {
      function s4() {
          return Math.floor((1 + Math.random()) * 0x10000)
              .toString(16)
              .substring(1);
      }
      return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
  }

  detectChange(): Observable < any > {
      return this.changeSub.asObservable();
  }
  watchStorage(): Observable < any > {
      return this.storageSub.asObservable();
  }

  inData(data) {
      this.inputData.next(data);
  }

  inSearchData(data) {
      this.inputData1.next(data);
  }

  logout() {
      localStorage.removeItem('currentUser');
  }

  async getType(): Promise < any > {
      const response = await this.http.get(this.api_url + 'api/Type').toPromise();
      return response;
  }

  async filterUsers(type) {
      const response = await this.http.get(this.api_url + 'api/queries/selectUserByType?user_type=' + type).toPromise();
      return response;
  }

  async addType(body): Promise < any > {
      const httpOptions = {
          headers: new HttpHeaders({
              'Content-Type': 'application/json'
          })
      };
      const response = await this.http.post(this.api_url + 'api/Type/', body, httpOptions).toPromise();
      return response;
  }

  registerUser(form) {
      const httpOptions = {
          headers: new HttpHeaders({
              'Content-Type': 'application/json'
          })
      };
      let rest_body = {
          "$class": "org.research.com.Users",
          "userId": this.guid(),
          "firstName": form.firstName,
          "lastName": form.lastName,
          "companyEmail": form.email,
          "password": Md5.init(form.password),
          "user_type": form.type,
          "active": true,
          "created_date": new Date().toString()
      }
      return this.http.post(this.api_url + 'api/Users', rest_body, httpOptions);
  }

  trackUser(form) {
      const httpOptions = {
          headers: new HttpHeaders({
              'Content-Type': 'application/json'
          })
      };
      let rest_body = {
          "firstName": form.firstName,
          "lastName": form.lastName,
          "companyEmail": form.email,
          "password": Md5.init(form.password),
          "user_type": form.type
      }
      return this.http.post(this.base_url + '/register', rest_body, httpOptions);
  }

  //Get user

  async getUser(pvrId) {
      const response = await this.http.get(this.api_url + 'api/queries/selectUserByEmail?email=' + pvrId.email).toPromise();
      return response;
  }

  async getUserByID(pvrId) {
      const response = await this.http.get(this.api_url + 'api/Users/' + pvrId).toPromise();
      return response;
  }

  // Login 

  async login(email: string, password: string): Promise < any > {
      const httpOptions = {
          headers: new HttpHeaders({
              'Content-Type': 'application/json'
          })
      };

      const response: any = await this.http.post(this.base_url + '/login', {
          email: email,
          password: Md5.init(password)
      }, httpOptions).toPromise();
      const resHyper: any = await this.http.get(this.api_url + 'api/queries/selectUserForLogin?email=' + response.email + '&password=' + response.password).toPromise();
      if (response.admin == 1) {
          let data = {
              "admin": response.admin,
              "code": response.code,
              "email": response.email,
              "first_name": response.first_name,
              "id": response.id,
              "last_name": response.last_name,
              "message": response.message,
              "token": response.token,
              "user_type": response.user_type
          }

          return data;
      } else {

          if (resHyper.length > 0 && resHyper[0].active == false) {
              return {
                  active: false
              };
          }

          if (response.code == '204') {
              return response;
          }

          if (response.token && resHyper[0].active == true) {
              let data = {
                  "admin": response.admin,
                  "code": response.code,
                  "email": response.email,
                  "first_name": response.first_name,
                  "id": response.id,
                  "last_name": response.last_name,
                  "message": response.message,
                  "token": response.token,
                  "user_type": response.user_type,
                  "user_ledgerid": resHyper[0].userId
              }

              return data;
          }
      }

  }

  async sendVerificationEmail(pvrId, email) {
      const httpOptions = {
          headers: new HttpHeaders({
              'Content-Type': 'application/json'
          })
      };
      const response: any = await this.http.post(this.base_url + '/sendemail', {
          user: pvrId,
          email: email
      }, httpOptions).toPromise();
      return response;
  }

  updateUserPassword(pvrId, user, pass) {

      let updated_user = {
          "$class": "org.research.com.Users",
          "firstName": user['firstName'],
          "lastName": user['lastName'],
          "companyEmail": user['companyEmail'],
          "password": Md5.init(pass),
          "user_type": user['user_type'],
          "active": user['companyEmail'],
          "created_date": new Date().toString()
      }
      return this.http.put(this.api_url + 'api/Users/' + pvrId, updated_user);
  }

  async addBlog(title, content, type, user, local): Promise < any > {
      const httpOptions = {
          headers: new HttpHeaders({
              'Content-Type': 'application/json'
          })
      };
      let typename;
      if (type == 1) {
          typename = "student";
      } else if (type == 2) {
          typename = "corporate or govt";
      } else if (type == 3) {
          typename = "medical";
      } else {
          typename = "not a researcher";
      }

      let blog = {
          "$class": "org.research.com.Blogs",
          "blogId": this.guid(),
          "userId": user,
          "title": title,
          "content": content,
          "user": user,
          "type": type,
          "tags": "",
          "created_date": new Date().toString()
      }
      let trackblog = {
          "userId": local,
          "title": title,
          "content": content,
          "type": type,
          "type_name": typename,
          "created_date": new Date().toString()
      }
      const resp: any = await this.http.post(this.base_url + '/Blogs', trackblog, httpOptions).toPromise();
      //console.log(resp);
      if (resp.code == '200') {
          const response: any = await this.http.post(this.api_url + 'api/Blogs', blog, httpOptions).toPromise();
          // console.log(response);
          const updateblog = await this.http.post(this.base_url + '/updateBlog', {
              id: resp.id,
              blog_id: response.blogId
          }, httpOptions).toPromise();
          if (updateblog['code'] == '200') {
              return response;
          } else {
              return updateblog;
          }
      } else {
          return resp;
      }

  }

  // Get by Type

  async getTypeBlogs(type) {

      const response = await this.http.get(this.api_url + 'api/queries/selectBlogByType?type=' + type).toPromise();
      return response;

  }

  // Get all

  async getAllBlogs() {

      const response = await this.http.get(this.api_url + 'api/Blogs').toPromise();
      return response;

  }

  async addExperience(pvrId, exp) {
      const httpOptions = {
          headers: new HttpHeaders({
              'Content-Type': 'application/json'
          })
      };
      let experience = {
          "$class": "org.research.com.Experiences",
          "expId": this.guid(),
          "person": pvrId,
          "position": exp.title,
          "company": exp.company,
          "location": exp.location,
          "startdate": exp.month + ' ' + exp.year,
          "enddate": exp.enddate + ' ' + exp.endyear
      }
      const response: any = await this.http.post(this.api_url + 'api/Experiences', experience, httpOptions).toPromise();
      return response;

  }

  async addSkill(pvrId, sk) {

      const httpOptions = {
          headers: new HttpHeaders({
              'Content-Type': 'application/json'
          })
      };
      let skill = {
          "$class": "org.research.com.Skills",
          "skillId": this.guid(),
          "uid": pvrId,
          "skill": sk
      }
      const response: any = await this.http.post(this.api_url + 'api/Skills', skill, httpOptions).toPromise();
      return response;
  }

  async addEducation(pvrId, education) {
      const httpOptions = {
          headers: new HttpHeaders({
              'Content-Type': 'application/json'
          })
      };

      let edu = {
          "$class": "org.research.com.Education",
          "educationId": this.guid(),
          "userId": pvrId,
          "school": education.school,
          "degree": education.degree,
          "study_type": education.study,
          "start_year": education.startyear,
          "end_year": education.endyear
      }
      const response: any = await this.http.post(this.api_url + 'api/Education', edu, httpOptions).toPromise();
      return response;

  }

  async getExperience(pvrId) {
      const response = await this.http.get(this.api_url + 'api/queries/selectExperienceByUserID?user=resource%3Aorg.research.com.Users%23' + pvrId).toPromise();
      return response;
  }

  async getSkills(pvrId) {
      const response = await this.http.get(this.api_url + 'api/queries/selectSkillsByUserID?user=resource%3Aorg.research.com.Users%23' + pvrId).toPromise();
      return response;
  }

  async getEducations(pvrId) {
      const response = await this.http.get(this.api_url + 'api/queries/selectEducationByUserID?user=resource%3Aorg.research.com.Users%23' + pvrId).toPromise();
      return response;
  }

  adduserInfo(pvrId, user_info) {
      const httpOptions = {
          headers: new HttpHeaders({
              'Content-Type': 'application/json'
          })
      };
      let info = {
          "$class": "org.research.com.Aboutinfo",
          "infoId": this.guid(),
          "userinfo_id": pvrId,
          "about_info": user_info
      }

      return this.http.post(this.api_url + 'api/Aboutinfo', info, httpOptions);

  }

  async getuserInfo(pvrId) {
      const response = await this.http.get(this.api_url + 'api/queries/selectInfoByUserID?user=resource%3Aorg.research.com.Users%23' + pvrId).toPromise();
      return response;
  }

  updateUserInfo(pvrId, user, user_info) {
      let updated_info = {
          "$class": "org.research.com.Aboutinfo",
          "userinfo_id": user,
          "about_info": user_info
      }
      return this.http.put(this.api_url + 'api/Aboutinfo/' + pvrId, updated_info);
  }

  async getBlogById(pvrId) {
      const response = await this.http.get(this.api_url + 'api/Blogs/' + pvrId).toPromise();
      return response;
  }

  postComment(name, blog, user, comment, profile_pic) {
      const httpOptions = {
          headers: new HttpHeaders({
              'Content-Type': 'application/json'
          })
      };

      let new_comment = {
          "$class": "org.research.com.Comments",
          "commentId": this.guid(),
          "blogId": blog,
          "comment": comment,
          "userId": user,
          "userID": user,
          "userName": name,
          "user_profile": profile_pic,
          "created_date": new Date().toString()
      };
      return this.http.post(this.api_url + 'api/Comments', new_comment, httpOptions);
  }

  updatePostComment(name, blog, user, comment, profile_pic) {
      const httpOptions = {
          headers: new HttpHeaders({
              'Content-Type': 'application/json'
          })
      };

      let new_comment = {
          "$class": "org.research.com.Comments",
          "commentId": this.guid(),
          "blogId": blog,
          "comment": comment,
          "userId": user,
          "userID": user,
          "userName": name,
          "user_profile": profile_pic,
          "created_date": new Date().toString()
      };
      return this.http.post(this.api_url + 'api/Comments', new_comment, httpOptions);
  }

  getAllComment(pvrId) {
      return this.http.get(this.api_url + 'api/queries/selectCommentsByBlogID?blog=resource%3Aorg.research.com.Blogs%23' + pvrId);

  }

  uploadUserProfilePic(form) {
      const httpOptions = {
          headers: new HttpHeaders({
              'Content-Type': 'application/json'
          })
      };
      return this.http.post(this.base_url + '/UploadProfilePic', form);
  }

  updateProfilePicOnLedger(pvrId, pic) {
      const httpOptions = {
          headers: new HttpHeaders({
              'Content-Type': 'application/json'
          })
      };

      let user_profile = {
          "$class": "org.research.com.UserPhoto",
          "photoId": this.guid(),
          "userID": pvrId,
          "profile_pic": pic
      }

      return this.http.post(this.api_url + 'api/UserPhoto', user_profile, httpOptions);
  }

  async getUserProfilePic(pvrId) {
      const response = this.http.get(this.api_url + 'api/queries/selectPhotoByUserID?user=' + pvrId).toPromise();
      return response;
  }

  changeProfilePic(pvrId, photo, pic) {
      let user_profile = {
          "$class": "org.research.com.UserPhoto",
          "userID": pvrId,
          "profile_pic": pic
      }
      return this.http.put(this.api_url + 'api/UserPhoto/' + photo, user_profile);
  }

  async getAllTypeBlogs() {

      const response = await this.http.get(this.api_url + 'api/Blogs').toPromise();
      return response;

  }

  async searchblogs(item) {
      const httpOptions = {
          headers: new HttpHeaders({
              'Content-Type': 'application/json'
          })
      };

      // console.log(item);
      const response: any = await this.http.post(this.base_url + '/SearchData', {
          item: item
      }, httpOptions).toPromise();
      return response;
  }

  async getAllUserComments(pvrId) {
      const res = await this.http.get(this.api_url + 'api/queries/selectCommentsByUserID?user=' + pvrId).toPromise();
      return res;
  }

  async getAllUserBlogs(pvrId) {
      const res = await this.http.get(this.api_url + 'api/queries/selectBlogsByUserID?user=' + pvrId).toPromise();
      return res;
  }

  async getAllUserBlogLikes(pvrId){
    const res = await this.http.get(this.api_url + 'api/queries/selectLikesByBlogId?blog=' + pvrId).toPromise();
      return res;
  }

  async getAllUser() {
      const res = await this.http.get(this.api_url + 'api/Users').toPromise();
      return res;
  }

  async likeBlog(blog, pvrId, name) {
      const httpOptions = {
          headers: new HttpHeaders({
              'Content-Type': 'application/json'
          })
      };
      let blogdata = {
              "$class": "org.research.com.Likes",
              "likeId": this.guid(),
              "blog": blog,
              "userID": pvrId,
              "blogID": blog,
              "userName": name,
              "created_date": new Date().toString()
          }
          //console.log(blogdata);
      const response: any = await this.http.post(this.api_url + 'api/Likes', blogdata, httpOptions).toPromise();
      return response;
  }

  async getBlogLike(blog, user) {
    const res = await this.http.get(this.api_url + 'api/queries/checkUserLikeForBlog?user='+user+'&blog='+blog).toPromise();
    return res;
  }

  async unlikeBlog(pvrId){
   const response= await this.http.delete(this.api_url + 'api/Likes/'+pvrId).toPromise();
   return response;
  }

  async getAllUserBlogComment(pvrId) {
   const res=await this.http.get(this.api_url + 'api/queries/selectCommentsByBlogID?blog=resource%3Aorg.research.com.Blogs%23' + pvrId).toPromise();
   return res;
}

async getUserphotos(){
    const response= await this.http.get(this.api_url + 'api/UserPhoto').toPromise();
    return response;
 }

 async followResearcher(followedBy,researcher){
    const httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json'
        })
    };
    let body={
        "$class": "org.research.com.Followers",
        "followerId": this.guid(),
        "user": researcher,
        "follower": followedBy
      }
    const response = await this.http.post(this.api_url + 'api/Followers', body, httpOptions).toPromise();
    return response;
 }

 async isfollowedResearcher(follow,user){
    const res=await this.http.get(this.api_url + 'api/queries/checkIsFollowing?user='+user+'&follower='+follow).toPromise();
    return res;
 }

 async getFollowers(pvrId){
    const res=await this.http.get(this.api_url + 'api/queries/selectFollowersbyId?user='+pvrId).toPromise();
    return res;
 }

 async uploadUserPaper(form,data) {
    const httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json'
        })
    };
    const res= await this.http.post(this.base_url + '/UploadUserPaper', form).toPromise();
    if(res != ''){
        let paper={
            "$class": "org.research.com.ResearchPapers",
            "rpId": this.guid(),
            "research_user": data.ledgerID,
            "title":data.title,
            "paper": res['img'],
            "status": 0,
            "type":data.type
          }
          
        const ledger_result:any=await this.http.post(this.api_url + 'api/ResearchPapers', paper,httpOptions).toPromise();
        return ledger_result;
    }
    
}

async getResearchPapers(){
    const res=await this.http.get(this.api_url + 'api/ResearchPapers').toPromise();
    return res;
}

 updateResearchPaper(paper){
 
    let item={
        "$class": "org.research.com.ResearchPapers",
            "research_user": paper.userid,
            "title":paper.title,
            "paper": paper.paper,
            "type":paper.type,
            "status": 1
    }
    return this.http.put(this.api_url + 'api/ResearchPapers/' + paper.Id, item);
}

async filterResearchPapers(type){
    const response = await this.http.get(this.api_url + 'api/queries/selectResearchPaperByType?type=' + type).toPromise();
    return response;
}

async addConference(data,sites,events,type){
   
    const httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json'
        })
    };
    let conference={
        "$class": "org.research.com.Conferences",
        "cId": this.guid(),
        "title": data.title,
        "description": data.description,
        "website_urls": sites,
        "organiser":data.name ,
        "contact_person":data.person ,
        "inquiry_email":data.email ,
        "paper_submission_lastdate": data.paper_date,
        "events": events,
        "status": 0,
        "type":type,
        "start_date": data.startdate,
        "end_date": data.enddate
    }

    const response = await this.http.post(this.api_url + 'api/Conferences', conference, httpOptions).toPromise();
    return response;
}

async getAllConferences(){
  
    const res=await this.http.get(this.api_url + 'api/Conferences').toPromise();
    return res;
}

async approveConference(conference,pvr){
  let  updated_status={
        "$class": "org.research.com.Conferences",
        "title": conference.title,
        "description": conference.description,
        "website_urls": conference.website_urls,
        "organiser": conference.organiser,
        "contact_person":conference.contact_person,
        "inquiry_email": conference.inquiry_email,
        "paper_submission_lastdate": conference.paper_submission_lastdate,
        "events": conference.events,
        "status": pvr==0?1:0,
        "type":conference.type,
        "start_date": conference.start_date,
        "end_date": conference.end_date
      }
 
    const response =await this.http.put(this.api_url + 'api/Conferences/' + conference.cId, updated_status).toPromise();
    return response;
}

async getConferenceById(pvrId){
    const res=await this.http.get(this.api_url + 'api/Conferences/'+pvrId ).toPromise();
    return res;
}

async removeOutdatedConferences(pvrId){
    const response= await this.http.delete(this.api_url + 'api/Conferences/'+pvrId).toPromise();
    return response;
}

async filterConferencesByType(type){
    const response = await this.http.get(this.api_url + 'api/queries/selectConferencesByType?type='+type+'&status=1').toPromise();
     return response;
 }

 async addOtherinfo(pvrId,info){
    const httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json'
        })
    };
        let other_info={
            "$class": "org.research.com.OtherInfo",
            "oInfoId": this.guid(),
            "userId": pvrId,
            "other_info": info
        }            

    const response = await this.http.post(this.api_url + 'api/OtherInfo', other_info, httpOptions).toPromise();
    return response;
 }

 async getuserOtherInfo(pvrId){
    const response = await this.http.get(this.api_url + 'api/queries/selectOtherInfoByUserID?user='+pvrId).toPromise();
    return response;
 }

 async updateOtherInfo(pvrId,info,infoID){
     let updated_info={
        "$class": "org.research.com.OtherInfo",
        "userId": pvrId,
        "other_info": info
      }
    const response:any= await this.http.put(this.api_url + 'api/OtherInfo/' + infoID, updated_info).toPromise();
    return response;
 }

}