import { Component, OnInit } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import {  DataService } from '../../_services/data.service';

@Component({
  selector: 'app-conference-single',
  templateUrl: './conference-single.component.html',
  styleUrls: ['./conference-single.component.css']
})
export class ConferenceSingleComponent implements OnInit {
  conference_id;
  conference : any; 
  loading = false;
  site_urls:any=[];
  events:any=[];
  constructor(
    private activatedRoute: ActivatedRoute,
    private dataService:DataService
  ) { 
   this.conference_id= this.activatedRoute.snapshot.paramMap.get("cid");
  }

  ngOnInit() {
    this.getConference();
  }
  
  async getConference(){
    this.loading = true;
   this.conference= await this.dataService.getConferenceById(this.conference_id);
   this.loading = false;
   console.log(this.conference);
    this.site_urls=this.conference.website_urls.split(","); 
    this.events=this.conference.events.split(",");
   console.log(this.events);

  }

}
