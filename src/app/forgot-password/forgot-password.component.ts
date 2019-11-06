import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {  DataService } from '../_services/data.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  fpForm:FormGroup;
  submitted = false;
  user:any;
  constructor(
    private formBuilder: FormBuilder,
    private dataService: DataService,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.fpForm = this.formBuilder.group({
      email: ['', Validators.required],
  });
}

get f() { return this.fpForm.controls; }

async forgotPassword(){
 this.submitted = true;
   if (this.fpForm.invalid) {
     return;
   }else{
    this.user=await this.dataService.getUser(this.fpForm.value);
    if(this.user != '')
    {
      let email=this.user[0].companyEmail;
     let email_msg =await this.dataService.sendVerificationEmail(this.user[0].userId,email);
     if(email_msg.code =='200'){
      this.toastr.success(email_msg.success);
     }else{
      this.toastr.error("Email server issue.");
     }
    }else{
      this.toastr.warning("No such user found");
    }
  }
}

}
