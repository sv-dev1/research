import { Component, OnInit } from '@angular/core';
import {  DataService } from '../../_services/data.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';


@Component({
  selector: 'app-add-blog',
  templateUrl: './add-blog.component.html',
  styleUrls: ['./add-blog.component.css']
})
export class AddBlogComponent implements OnInit {
  userId;
  local_userId;
  type:number;
  public editorValue: string = '';
  public title:string= '';
  titleError:boolean=false;
  contentError:boolean=false;
  disable_btn:boolean=false;
  constructor(
    private dataService: DataService,
    private toastr: ToastrService,
    private router: Router
  ) { }

  ngOnInit() {
    let user=JSON.parse(localStorage.getItem('currentUser'));
    this.userId=user.user_ledgerid;
    this.local_userId=user.id;
    this.type=user.user_type;
  }

 async submitblog(){
   this.disable_btn=true;
    if(this.title == ''){
      this.titleError=true;
      this.disable_btn=false;
      return;
    }else{
      this.titleError=false;
    }
    if(this.editorValue == ''){
      this.contentError=true;
      this.disable_btn=false;
      return;
    }else{
      this.contentError=false;
    }
   let result =await this.dataService.addBlog(this.title,this.editorValue,this.type,this.userId,this.local_userId);
   
    if(result.code =="204"){
      this.toastr.error("Something went wrong!",'', {
        timeOut: 4000
      });
      this.disable_btn=false;
    }else{
      this.toastr.success("New blog added.",'', {
        timeOut: 2000
      });

      setTimeout(()=>{
        this.router.navigate(['/blogs']);
      },1000);
      
    } 
  }

}
