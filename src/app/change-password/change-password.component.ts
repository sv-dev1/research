import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {  DataService } from '../_services/data.service';
import { ToastrService } from 'ngx-toastr';
import { MustMatch } from '../_helpers/must-match.validator';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
 user:string="";
 passwordChangeForm:FormGroup;
 submitted = false;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private dataService: DataService,
    private toastr: ToastrService
    ) { 
    
  this.route.params.forEach((params) => {
    this.user = params['id'];
   // console.log(this.user);
    })

  this.passwordChangeForm = this.formBuilder.group({
    password: ['', Validators.required],
    cpassword: ['', Validators.required],
    }, 
    {validator: MustMatch('password', 'cpassword')
}); 
  }

  ngOnInit() {
  }
  
  get f() { return this.passwordChangeForm.controls; }

  async onChange(){
    this.submitted = true;
   if (this.passwordChangeForm.invalid) {
     return;
   }else{
     //console.log(this.passwordChangeForm.value);
    let user =await this.dataService.getUserByID(this.user);
    this.dataService.updateUserPassword(this.user,user,this.passwordChangeForm.value.password).subscribe(response=>{
      this.toastr.success("Password has been changed.",'', {
        timeOut: 2000
      });
      setTimeout(()=>{
        this.router.navigate(['']);
      },1000);
    },error=>{
      this.toastr.error("Internal server error..");
    })
   }
  }

}
