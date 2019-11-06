import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import {  DataService } from '../../_services/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-research-item',
  templateUrl: './add-research-item.component.html',
  styleUrls: ['./add-research-item.component.css']
})
export class AddResearchItemComponent implements OnInit {
  file:any;
  userId:string="";
  type;
  local_userId;
  researchItemForm:FormGroup;
  submitted = false;
  loading:boolean=false;
  paperUpload:boolean=false;
 

  constructor(
    private formBuilder: FormBuilder,
    private dataService:DataService,
    private toastr: ToastrService,
    private router: Router
  ) { }

  ngOnInit() {
    let user=JSON.parse(localStorage.getItem('currentUser'));
    this.userId=user.user_ledgerid;
    this.local_userId=user.id;
    this.type=user.user_type;
    this.researchItemForm = this.formBuilder.group({
      title: ['', Validators.required],
      paper: [null, Validators.required],
  });
  }


  get f() { return this.researchItemForm.controls; }


  async addResearchItem(){
    this.submitted = true;
    this.loading=true;
   
    if(this.researchItemForm.value.title == ''){
      this.loading=false;
         return;
    }
    else if (this.researchItemForm.value.paper == null) {
      this.paperUpload=true;
      this.loading=false;
      return;
    }else{
      this.paperUpload=false;
      //console.log(this.file);
      var strFileName = this.getFileExtension1(this.file.name);
       
    if(strFileName != 'pdf'){
      this.toastr.warning("Please select only PDF document.",'', {
        timeOut: 3000
      });
      this.loading=false;
      return;
      }

      var input_data = {
        "userID": this.local_userId,
        "ledgerID":this.userId,
        "title":this.researchItemForm.value.title,
        "profilePic": this.file == undefined ? "" : this.file,
        "type":this.type
       

        }
       // console.log(input_data);
        const formData = new FormData();
        formData.append('userID',input_data.userID);
        formData.append('ledgerID',input_data.ledgerID);
        formData.append('profilePic', input_data.profilePic);
        formData.append('title', input_data.title);
        let result= await this.dataService.uploadUserPaper(formData,input_data);
        if(result != ''){
          this.loading=false;
          this.toastr.success("New paper has been uploaded.",'Research', {
            timeOut: 2000
          });
    
          setTimeout(()=>{
            this.router.navigate(['/research-items']);
          },1000);
        }
        
    }


  }


  fileChange(file) {
    this.file = file.target.files[0];
    }

    getFileExtension1(filename) {
      return (/[.]/.exec(filename)) ? /[^.]+$/.exec(filename)[0] : undefined;
      }

      
}
