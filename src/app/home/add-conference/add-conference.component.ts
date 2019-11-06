import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup,FormControl,FormArray, Validators } from '@angular/forms';
import {  DataService } from '../../_services/data.service';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router'

@Component({
  selector: 'app-add-conference',
  templateUrl: './add-conference.component.html',
  styleUrls: ['./add-conference.component.css']
})
export class AddConferenceComponent implements OnInit {
  conferenceForm: FormGroup;
    type:number;
    loading = false;
    submitted = false;
    options = {}; 
    allEvents:any=[];
    allSties:any=[];

  constructor(
    private formBuilder: FormBuilder,
    private dataService: DataService,
    private toastr: ToastrService,
    private router: Router
  ) { 

    this.options = {
      minYear: 1960,
      maxYear: 2100,
      displayFormat: 'YYYY-MM-DD', 
      barTitleFormat: 'MMMM YYYY',
      dayNamesFormat: 'dd',
      firstCalendarDay: 0,
      minDate: new Date(Date.now()),
     // maxDate: new Date(Date.now()),
      placeholder: 'YYYY-MM-DD',
      addClass: 'form-control',
      addStyle: {},
      fieldId: 'my-date-picker',
      useEmptyBarTitle: false,
    };
  }

  ngOnInit() {
    let user=JSON.parse(localStorage.getItem('currentUser'));
    this.type=user.user_type; 
    this.conferenceForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      email: ['', Validators.required],
      name: ['', Validators.required],
      person: ['', Validators.required],
      sites:this.formBuilder.array([this.formBuilder.group({website:''})]),
      paper_date:['',Validators.required],
      events:this.formBuilder.array([this.formBuilder.group({events:''})]),
      startdate:['',Validators.required],
      enddate:['',Validators.required]
      
  });
  }
  get f() { return this.conferenceForm.controls; }

  get websites() {
    return this.conferenceForm.get('sites') as FormArray;
  }

  addMoreSites(){
    this.websites.push(this.formBuilder.group({website:''}));
  }

  get event() {
    return this.conferenceForm.get('events') as FormArray;
  }

  addMoreEvents(){
    this.event.push(this.formBuilder.group({events:''}));
  }

  async onSubmit(){
    this.submitted = true;
    if (this.conferenceForm.invalid) {
      return;
  }else{
    this.loading=true;
    var sites;
    var eventss; 
    for(let i=0;i<this.conferenceForm.value.sites.length;i++){
      let item=this.conferenceForm.value.sites[i]['website'];
      this.allSties.push(item);
      sites=this.allSties.join(",");
    }

    for(let j=0;j<this.conferenceForm.value.events.length;j++){
      let evt=this.conferenceForm.value.events[j]['events'];
      this.allEvents.push(evt);
      eventss=this.allEvents.join(",");
    }

  let added = await this.dataService.addConference(this.conferenceForm.value,sites,eventss,this.type);
    
    if(added != ''){
      this.loading=false;
          this.toastr.success("New Added.",'Conference', {
            timeOut: 2000
          });
    
          setTimeout(()=>{
            this.router.navigate(['/conferences']);
          },1000);
    }
   
  }
}

}
