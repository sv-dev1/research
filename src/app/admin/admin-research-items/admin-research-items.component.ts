import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {  DataService } from '../../_services/data.service';
import { environment} from '../../../environments/environment';

@Component({
  selector: 'app-admin-research-items',
  templateUrl: './admin-research-items.component.html',
  styleUrls: ['./admin-research-items.component.css']
})
export class AdminResearchItemsComponent implements OnInit {
 
  img_url; 
  rp:any=[]
  users:any=[];
  research_papers:any=[];
  loading:boolean=false;
  selectType:string="";

  constructor(
    private router: Router,
    private dataService:DataService
  ) {
    this.img_url = environment.img_url;
   }

  ngOnInit() {
    this.getAllResearchPapers();
  }

  async getAllResearchPapers(){
    this.loading=true;
    this.rp= await this.dataService.getResearchPapers();
   this.users =await this.dataService.getAllUser();
   this.rp.forEach(paper => {
     this.users.forEach(user => {
      // console.log(user);
       if(user.userId == paper.research_user){
         //console.log(paper.rpId);
         let researchItems={
           "title":paper.title,
           "userid":paper.research_user,
           "Id":paper.rpId,
           "paper":paper.paper,
           "name":user.firstName+' '+user.lastName,
           "type":paper.type,
           "status":paper.status
         }
         this.research_papers.push(researchItems);
         this.loading=false;
       }
     });
   });

    console.log(this.research_papers);
  }

   showDownload(obj){
    this.dataService.updateResearchPaper(obj).subscribe((response)=>{
      obj.status=true;
    },error=>{
     console.log(error);
    })
  }


  async filterType(){
    this.research_papers=[];
    this.loading=true;
    if(this.selectType != ''){
      this.rp=await this.dataService.filterResearchPapers(this.selectType);
      this.users =await this.dataService.getAllUser();
      if(this.rp != ''){
      this.rp.forEach(paper => {
        this.users.forEach(user => {
         // console.log(user);
          if(user.userId == paper.research_user){
            //console.log(paper.rpId);
            let researchItems={
              "title":paper.title,
              "userid":paper.research_user,
              "Id":paper.rpId,
              "paper":paper.paper,
              "name":user.firstName+' '+user.lastName,
              "type":paper.type,
              "status":paper.status
            }
            this.research_papers.push(researchItems);
            this.loading=false;
          }
        });
      });
    }else{
      this.getAllResearchPapers();
      this.loading=false;
    }
      
   }else{
      this.getAllResearchPapers();

    }
  }

}
