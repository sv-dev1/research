import { Component, OnInit } from '@angular/core';
import {  DataService } from '../../_services/data.service';

@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.css']
})
export class AdminUsersComponent implements OnInit {
users:any=[];
loading=false;
selectType:string="";

  constructor(
    private dataService: DataService
  ) { }

  ngOnInit() {
    this.getUsers();
  }
  
  async getUsers(){
    this.loading=true;
   let res =await this.dataService.getAllUser();
   if(res){
     this.users=res;
     this.loading=false;
   }else{
     this.users=[];
     this.loading=false;
    }
  }

 async filterType(){
    this.users=[];
    if(this.selectType != ''){
      this.users=await this.dataService.filterUsers(this.selectType);
    }else{
      this.getUsers();

    }
  }

}
