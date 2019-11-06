import { Component, OnInit } from '@angular/core';
import {  DataService } from '../../_services/data.service';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { environment} from '../../../environments/environment';

@Component({
  selector: 'app-researchers',
  templateUrl: './researchers.component.html',
  styleUrls: ['./researchers.component.css']
})
export class ResearchersComponent implements OnInit {
 userId;
 followedBy;
 followed:any=[];
 following:boolean=false;
 img_url;
 profile_pic;
 userArr:any;
 name:string="";
 infoArr:any;
 overview:string="";
 research_items:any;
 total_researchItems;
 cmnts:any;
 totalcomments:number=0;
 blogdata:any=[];
 countCmntArr:any=[];
 getUserBlog:any;
 totalLikes:number=0;
 likeArr:any=[];
 countLikeArr:any=[];
 skills:any;
 exp:any=[];
 education:any=[];
 totalFollowers:number=0;
 followers:any=[];
 otherInfo:string='';

  constructor(
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private dataService:DataService
  ) { 
    this.img_url = environment.img_url;
    this.route.params.forEach((params) => {
      this.userId = params['rid'];
      })
  }

  ngOnInit() {
    let user = JSON.parse(localStorage.getItem('currentUser'));
		this.followedBy = user.user_ledgerid;
    this.getResearcher();
    this.getResearcherOverview();
    this.allBlogs();
    this.getUserOtherinfo();
    this.getAllResearcherComments();
    this.getSkills();
    this.getExperiences();
    this.getEducations();
    this.getResearcherPic();
    this.isResearchFollowing();
    this.getFollowers();
  }

async getResearcher(){
  this.userArr = await this.dataService.getUserByID(this.userId);
  this.name=this.userArr.firstName+' '+this.userArr.lastName;
}

async getResearcherPic(){
  let user = await this.dataService.getUserProfilePic(this.userId);
   if(user != ''){
    this.profile_pic=this.img_url+''+user[0].profile_pic;
   }else{
    this.profile_pic=this.img_url+'/research/uploads/9155719756';
    
   }
 
}

async getResearcherOverview(){
this.infoArr =await this.dataService.getuserInfo(this.userId);
if(this.infoArr != ''){
  this.overview=this.infoArr[0].about_info?this.infoArr[0].about_info:'';
 }else{
   this.overview="";
 }
}

async allBlogs(){
  this.research_items =await this.dataService.getAllUserBlogs(this.userId);
  this.total_researchItems=this.research_items.length;
  this.research_items = this.research_items.sort((a, b) => {    // Sorting by Date 
    return <any>new Date(b.created_date) - <any>new Date(a.created_date);
  });
  return this.research_items;
 }
 
 async getAllResearcherComments(){
  this.blogdata = await this.dataService.getAllUserBlogs(this.userId);
  this.blogdata.forEach(blogdata => {
    this.getAllUserComments(blogdata.blogId);
  });
  
  }

  async getUserOtherinfo(){
    let res = await this.dataService.getuserOtherInfo(this.userId);
    this.otherInfo=res[0].other_info;
   }

 async getAllUserComments(pvrId){
   this.cmnts =await this.dataService.getAllUserBlogComment(pvrId);
   this.cmnts.forEach(cmnts=>{
     this.countCmntArr.push(cmnts);
   })
   this.totalcomments=this.countCmntArr.length;
  }


  async TotalUserBlogLikes(){
    setTimeout(()=>{
      this.getblogs()
    },1000);
  }
  
  async getblogs(){
    this.getUserBlog=[];
    this.getUserBlog = await this.dataService.getAllUserBlogs(this.userId);
    this.getUserBlog.forEach(getUserBlog => {
    this.getUserTotalLikes(getUserBlog.blogId);
    });
   }
  
   async getUserTotalLikes(pvrId){
   this.likeArr=await this.dataService.getAllUserBlogLikes(pvrId);
   this.likeArr.forEach(like=>{
     this.countLikeArr.push(like);
   })
     this.totalLikes=this.countLikeArr.length;
   }

   async getSkills(){
    this.skills=await this.dataService.getSkills(this.userId); 
  }

  async getEducations(){
    this.education=await this.dataService.getEducations(this.userId); 
  }

  async getExperiences(){

    this.exp=await this.dataService.getExperience(this.userId); 
  }

  async isResearchFollowing(){
   this.followed= await this.dataService.isfollowedResearcher(this.followedBy,this.userId);
  // console.log(this.followed);
   if(this.followed != ''){
     this.following=true;
   }else{
    this.following=false;
   }
  }

  async followResearcher(){
    let result=await this.dataService.followResearcher(this.followedBy,this.userId);
    if(result !=''){
     //console.log(result);
     this.following=true;
     let msg="You have started following "+this.name;
     this.toastr.success(msg,'', {
      timeOut: 3000
    });
    }
  }

  async getFollowers(){
    this.followers= await this.dataService.getFollowers(this.userId);
    this.totalFollowers=this.followers.length;
   }
}

