import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {  DataService } from '../../_services/data.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profie',
  templateUrl: './profie.component.html',
  styleUrls: ['./profie.component.css']
})
export class ProfieComponent implements OnInit {
  userId;
  addexp: FormGroup;
  addedu:FormGroup;
  exp:any=[];
  skills:any=[];
  education:any=[];
  submitted = false;
  skill:string="";
  info:string="";
  infoId:string="";
  overview:any
  skillErr:boolean=false;
  exp_popup:boolean=false;
  skill_popup:boolean=false;
  eduPopup:boolean=false;
  disable_btn:boolean=false;
  info_popup:boolean=false;
  info_btn:boolean=true;
  cmnts:any;
  totalcomments:number=0;
  totalLikes:number=0;
  usertype:number;
  research_items:any;
  total_researchItems;
  blogdata:any=[];
  countCmntArr:any=[];
  getUserBlog:any;
  likeArr:any=[];
  countLikeArr:any=[];
  totalFollowers:number=0;
  followers:any=[];
  otherInfoModel:boolean=false;
  otherInfo:string='';
  otherInfoErr:boolean=false;
  infoo:any;
  
  constructor(
    private formBuilder: FormBuilder,
    private dataService: DataService,
    private toastr: ToastrService,
    private router: Router
  ) { }

  ngOnInit() {
     
    let user=JSON.parse(localStorage.getItem('currentUser'));
    this.userId=user.user_ledgerid;
    this.usertype=user.user_type; 

    this.addedu=this.formBuilder.group({
      school: ['', Validators.required],
      degree: [''],
      study: [''],
      startyear: [null],
      endyear: [null],

  });
  
    this.addexp = this.formBuilder.group({
      title: ['', Validators.required],
      company: ['', Validators.required],
      location: ['', Validators.required],
       month: [null, Validators.required],
       year: [null, Validators.required],
       enddate: [null, Validators.required],
       endyear: [null, Validators.required]
  });

  this.getExperiences();
  this.getUserOtherinfo();
  this.getSkills();
  this.getEducations();
  this.getUserOverview();
  this.getAllComments();
  this.TotalUserBlogLikes();
  this.getFollowers();
  this.allBlogs(this.usertype);
}

  get f() { return this.addexp.controls; }

  get g() { return this.addedu.controls; }


  async allBlogs(type){
    this.research_items =await this.dataService.getAllUserBlogs(this.userId);
    this.total_researchItems=this.research_items.length;
    this.research_items = this.research_items.sort((a, b) => {    // Sorting by Date 
      return <any>new Date(b.created_date) - <any>new Date(a.created_date);
    });
    return this.research_items;
   } 
  

async getExperiences(){

  this.exp=await this.dataService.getExperience(this.userId); 
}

async getSkills(){

  this.skills=await this.dataService.getSkills(this.userId); 
}

async getEducations(){

  this.education=await this.dataService.getEducations(this.userId); 
}

async addEducation(){
  this.disable_btn=true;
  this.submitted = true;
  if (this.addedu.invalid) {
    this.disable_btn=false;
    return;
  }else{
    let res= await this.dataService.addEducation(this.userId,this.addedu.value);
    this.disable_btn=false;
    this.addedu.reset();
    if(res){
      this.toastr.success("Added successfully.",'', {
        timeOut: 3000
      });
      this.getEducations();
      this.eduPopup=false;

    }
  }
  
}

 async addExperience(){
    this.submitted = true;
    this.disable_btn=true;
    if (this.addexp.invalid) {
      this.disable_btn=false;
      return;
    }else{
      await this.dataService.addExperience(this.userId,this.addexp.value);
      this.exp_popup=false;
      this.addexp.reset();
      this.getExperiences();
      this.disable_btn=false;
    }
  }

  addSkillspopup(){
    this.skill_popup=true;
  } 

  addOtherinfo(){
   this.otherInfoModel=true;
  }

  closeOtherInfo(){
    this.otherInfoModel=false;
  }


  closeskillPopup(){
    this.skill_popup=false;
  }

  openExpPopup(){
    this.exp_popup=true;
  }

  closeExpPopup(){
    this.exp_popup=false;
  } 

 async addSkill(){
  this.disable_btn=true;
    if(this.skill==''){
      this.skillErr=true;
      this.disable_btn=false;
      return;
    }
    let res=await this.dataService.addSkill(this.userId,this.skill);
    this.disable_btn=false;
    if(res !=''){
      this.toastr.success("Added successfully.",'Skill', {
        timeOut: 4000
      });
      this.skill='';
      this.getSkills();
      this.skill_popup=false;
    }

  }

  openEducationpopup(){
    this.eduPopup=true;
  }

  closeEducationpopup(){
    this.eduPopup=false;
  }

  makeString(arr){
  console.log(arr);
  }

  openOverview(){
    this.info_popup=true;
    if(this.info != ''){
      this.info_btn=false;
    }else{
      this.info_btn=true;
    }
  }

  closeOverview(){
    this.info_popup=false;
  }

  enableInfobtn(){
    if(this.info != ''){
      this.info_btn=false;
    }else{
      this.info_btn=true;
    }
    
  }

 async addInfo(infoId){
  this.info_btn=true;
  let res = await this.dataService.getuserInfo(this.userId);
   if(res != ''){
    this.dataService.updateUserInfo(infoId,this.userId,this.info).subscribe(response=>{
      this.info='';
      this.toastr.success("Info updated.",'', {
       timeOut: 4000
     });
     this.getUserOverview();
     this.info_btn=false;
     this.info_popup=false;
    },error=>{
      this.toastr.error("Something went Wrong!",error.status, {
       timeOut: 4000
     });
     this.info_btn=false;
     this.info_popup=false;
    })
   }else{
    this.dataService.adduserInfo(this.userId,this.info).subscribe(response=>{
      //console.log(response);
      this.info='';
      this.info_btn=false;
      this.toastr.success("Info Added.",'', {
       timeOut: 4000
     });
     this.getUserOverview();
     this.info_popup=false;
    },error=>{
      this.toastr.error("Something went Wrong!",error.status, {
       timeOut: 4000
     });
     this.info_btn=false;
     this.info_popup=false;
    })
   }
   
   
  }

  async getUserOtherinfo(){
   let res = await this.dataService.getuserOtherInfo(this.userId);
   this.otherInfo=res[0].other_info;
  }

  async getUserOverview(){
   let res = await this.dataService.getuserInfo(this.userId);
   if(res){
    this.info= res[0].about_info;
    this.infoId= res[0].infoId;
   }
   
  }

 async getAllComments(){
  this.blogdata = await this.dataService.getAllUserBlogs(this.userId);
  this.blogdata.forEach(blogdata => {
    this.getAllUserComments(blogdata.blogId);
  });
  
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

 async getFollowers(){
   this.followers= await this.dataService.getFollowers(this.userId);
   this.totalFollowers=this.followers.length;
  }

  async addOtherResearchInfo(){
    console.log(this.otherInfo);
    let res = await this.dataService.getuserOtherInfo(this.userId);
    if(res != ''){
      const result:any= await this.dataService.updateOtherInfo(this.userId,this.otherInfo,res[0].oInfoId);
      if(result){
        this.toastr.success("Updated successfully!",'', {
          timeOut: 3000
        });
        this.getUserOtherinfo();
        this.otherInfoModel=false;
      }else{
        this.toastr.error("Something Went Wrong! Try after some time.",'', {
          timeOut: 2000
        });
      }
    }else{
       
      if(this.otherInfo == ''){
        this.otherInfoErr=true;
      }else{
        this.otherInfoErr=false;
        this.infoo= await this.dataService.addOtherinfo(this.userId,this.otherInfo);
       console.log(this.infoo);
       if(this.infoo !=''){
        this.otherInfo=this.infoo.other_info;
        this.toastr.success("Added successfully!",'', {
          timeOut: 3000
        });
        this.getUserOtherinfo();
        this.otherInfoModel=false;
       }else{
        this.toastr.error("Something Went Wrong! Try after some time.",'', {
          timeOut: 2000
        });
       }
       
      }
    }
    
  }
}


