import { Component, OnInit } from '@angular/core';
import {  DataService } from '../../_services/data.service';
import { Router,ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { environment} from '../../../environments/environment';

@Component({
  selector: 'app-admin-single-blog',
  templateUrl: './admin-single-blog.component.html',
  styleUrls: ['./admin-single-blog.component.css']
})
export class AdminSingleBlogComponent implements OnInit {
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

  constructor(
    private dataService:DataService,
    private toastr: ToastrService,
    private route: ActivatedRoute
  ) {
    this.img_url = environment.img_url;
    this.route.params.forEach((params) => {
      this.blogID = params['blogID'];
      });
   }

  ngOnInit() {
    this.getBlog(this.blogID);
    this.getAllComments(this.blogID);
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
     console.log(this.comments);
    },error=>{
      this.toastr.error("Something Went Wrong!",'', {
        timeOut: 3000
      });
    })
  }

}
