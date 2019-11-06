import { Component, OnInit } from '@angular/core';
import {  DataService } from '../_services/data.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  blogs:any;
  users:any;
  totalblogs:number=0;
  totalusers:number=0;

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.allBlogs();
    this.getUsers();
  }

  async allBlogs(){
    this.blogs=await this.dataService.getAllBlogs();
    this.totalblogs=this.blogs.length;
   } 

   async getUsers(){
   this.users = await this.dataService.getAllUser();
   this.totalusers=this.users.length;
   }

}
