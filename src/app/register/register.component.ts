import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {  DataService } from '../_services/data.service';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
 
  registerForm: FormGroup;
    loading = false;
    submitted = false;
    disable_btn:boolean=false;

  constructor(
    private formBuilder: FormBuilder,
    private dataService: DataService,
    private toastr: ToastrService,
    private router: Router
  ) {

   }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      type: [null, Validators.required],
      password: ['', [Validators.required, Validators.minLength(5)]]
  });
  }

  get f() { return this.registerForm.controls; }


  onSubmit(){
    this.submitted = true;
    if (this.registerForm.invalid) {
      return;
  }else{
    this.disable_btn=true;
    this.loading = true;
    this.dataService.trackUser(this.registerForm.value).subscribe(response=>{
    if(response['code']==200){
      this.registerUser(this.registerForm.value);
     }
    if(response['resp'] == 'duplicate'){
      this.loading = false;
      this.toastr.warning(response['msg']);
      this.disable_btn=false;
    }      
    if(response['code']==204){
      this.loading = false;
      this.toastr.error(response['failed']);
      this.disable_btn=false;
    }  
   },error=>{
      this.loading = false;
      this.disable_btn=false;
      console.log(error);
      this.toastr.error('Something went wrong! ', '',{timeOut: 5000} );
    })
  }
  
  }


  registerUser(model){
    this.dataService.registerUser(model).subscribe(data=>{
      this.loading = false;
      this.toastr.success("User registered successfully.");
      this.disable_btn=false;
      setTimeout(()=>{
          this.router.navigate(['/login']);
        },3000);
    },error=>{
      this.loading = false;
      this.toastr.error(error['statusText']);
    });
  }

}
