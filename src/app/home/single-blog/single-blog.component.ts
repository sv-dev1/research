import { Component, OnInit } from '@angular/core';
import {  DataService } from '../../_services/data.service';
import { Router,ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { environment} from '../../../environments/environment';
@Component({
selector: 'app-single-blog',
templateUrl: './single-blog.component.html',
styleUrls: ['./single-blog.component.css']
})
export class SingleBlogComponent implements OnInit {
userId;
blogID;
img_url;
blogs:any;
title;
name:string="";
content;
comments:any=[];
comment:string="";
commentError:boolean=false;
disable_btn:boolean=false;
profile_pic;
userLikeArr:any=[];
IsUserLiked:boolean=false;
constructor(
private dataService:DataService,
private toastr: ToastrService,
private route: ActivatedRoute
) { 
this.img_url = environment.img_url;
}
ngOnInit() {
this.route.params.forEach((params) => {
this.blogID = params['blogID'];
});
let user=JSON.parse(localStorage.getItem('currentUser'));
this.userId=user.user_ledgerid; 
this.name=user.first_name+' '+user.last_name;
this.getBlog(this.blogID);
this.getAllComments(this.blogID);
this.getProfilePhoto();
this.getCurrentUserBlogLike();
}
async getProfilePhoto(){
let photo=await this.dataService.getUserProfilePic(this.userId);
//console.log(photo);
if(photo != ''){
this.profile_pic=photo[0].profile_pic;
}
}
async getCurrentUserBlogLike(){
  let res =await this.dataService.getBlogLike(this.blogID,this.userId);
  if(res != ''){
    this.userLikeArr=res[0];
    this.IsUserLiked=true;
    //console.log(this.userLikeArr);
  }else{
    this.userLikeArr=[];
    this.IsUserLiked=false;
  }
}
async getBlog(PvrId){
this.blogs=await this.dataService.getBlogById(PvrId);
if(this.blogs){
this.title=this.blogs.title;
this.content=this.blogs.content;
}
}
getAllComments(pvrId){
this.dataService.getAllComment(pvrId).subscribe((response)=>{
this.comments=response;
},error=>{
this.toastr.error("Something Went Wrong!",'', {
timeOut: 3000
});
})
}
async like(pvrId){
  this.disable_btn=true;
  if(pvrId == 0){
   let unliked= await this.dataService.unlikeBlog(this.userLikeArr['likeId']); 
   this.getCurrentUserBlogLike();
   this.disable_btn=false;
  }else{
    let liked =await this.dataService.likeBlog(this.blogID,this.userId,this.name);
    this.getCurrentUserBlogLike();
    this.disable_btn=false;
  } 
}
postCmment(){
let ppic;
this.disable_btn=true;
if(this.comment == '')
{
this.commentError=true;
this.disable_btn=false;
}else{
this.commentError=false;
if(this.profile_pic){
ppic=this.profile_pic;
}else{
ppic='/research/uploads/9155719756';
}
this.dataService.postComment(this.name,this.blogID,this.userId,this.comment,ppic).subscribe((response)=>{
this.toastr.success("New comment has been posted.",'', {
timeOut: 3000
});
this.comment = '';
this.comments.push(response);
this.disable_btn=false;
},error=>{
this.toastr.error("Something Went Wrong!.",'', {
timeOut: 3000
});
this.disable_btn=false;
})
}
}
getUserName(pvrId){
console.log(pvrId);
}

}