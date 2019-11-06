import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {  DataService } from '../../_services/data.service';

@Component({
  selector: 'app-conferences',
  templateUrl: './conferences.component.html',
  styleUrls: ['./conferences.component.css']
})
export class ConferencesComponent implements OnInit {
  conferences:any=[];
  loading = false;
  coming_conferences:any=[];
  selectType:string="";

  constructor(
    private router: Router,
    private dataService:DataService
  ) { }

  ngOnInit() {
    this.getAllconferences();
  }

  addConference(){
    this.router.navigate(['conference' , 'add']);
  }

  openConferenceRoom(pvrId){

  this.router.navigate(['conference',pvrId ]);
  }

  async getAllconferences(){
    this.loading = true;
    let curDate=new Date().getTime();
    this.conferences= await this.dataService.getAllConferences();
    this.conferences.forEach(c => {
      let enddate=new Date(c.end_date).getTime();
      if(curDate > enddate){
        this.deleteOutdatedConferences(c.cId);
      }
    });
    
    this.loading = false;
    //console.log(this.conferences);
  }

  async deleteOutdatedConferences(pvrId){
    let outdated= await this.dataService.removeOutdatedConferences(pvrId);
  }
  
  async filterType(){
    this.loading = true;
    this.conferences=[];
    if(this.selectType != ''){
      let result= await this.dataService.filterConferencesByType(this.selectType);
      if(result != ''){
        this.conferences=result;
        this.loading = false;
      }else{
        setTimeout(() => { this.getAllconferences(); 
        }, 1000);
        
        
      }
      
    }else{
      this.loading=true;
      this.getAllconferences();
      this.loading = false;
    }
    
  }

}
