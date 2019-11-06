import { Component, OnInit } from '@angular/core';
import {  DataService } from '../../_services/data.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-admin-conferences',
  templateUrl: './admin-conferences.component.html',
  styleUrls: ['./admin-conferences.component.css']
})
export class AdminConferencesComponent implements OnInit {
  conferences:any=[];
  loading = false;

  constructor(
    private dataService:DataService,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.getAllconferences();
  }

  async getAllconferences(){
    this.loading = true;
    this.conferences= await this.dataService.getAllConferences();
    this.loading = false;
    //console.log(this.conferences);
  }

  async approveConference(conference,pvr){
  let approved= await this.dataService.approveConference(conference,pvr);
 // console.log(approved);
  if(approved != ''){
    if(approved['status']==1){
      this.toastr.success("",'Approved', {
        timeOut: 2000
      });
      conference.status=1;
    }else{
      this.toastr.success("",'Unapproved', {
        timeOut: 2000
      });
      conference.status=0;
    }
    
  }
  }

}
