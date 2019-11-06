import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {  DataService } from '../../_services/data.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {
 blogs:any;
 loading:boolean=false;
 userId;
 type:number;
  constructor(
    private formBuilder: FormBuilder,
    private dataService: DataService,
    private router: Router
  ) { }

  ngOnInit() {

    let user=JSON.parse(localStorage.getItem('currentUser'));
    this.userId=user.user_ledgerid;
    this.type=user.user_type; 
    this.allBlogs();
  }

 async allBlogs(){
  this.loading=true;
  //this.blogs=await this.dataService.getTypeBlogs(type);
  this.blogs= await this.dataService.getAllUserBlogs(this.userId);
  this.loading=false;
 // console.log(this.blogs);
 } 

  addblog(){
    this.router.navigate(['blog' , 'add']);
  }
}
