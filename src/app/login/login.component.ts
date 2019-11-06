import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {  DataService } from '../_services/data.service';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm:FormGroup;
  loading = false;
  submitted = false;
  message:any;

  constructor(
    private formBuilder: FormBuilder,
    private dataService: DataService,
    private toastr: ToastrService,
    private router: Router
  ) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['',Validators.required]
  });
  }


  get f() { return this.loginForm.controls; }


  async onLogin(){
   this.submitted = true;
   this.loading=true;
   if (this.loginForm.invalid) {
    this.loading=false;
     return;
   }else{
     //console.log(this.loginForm.value);
        this.message = await this.dataService.login(this.loginForm.value.email ,this.loginForm.value.password);
        console.log(this.message);
        if(this.message.admin == 1){
          this.loading = false;
          localStorage.setItem('currentUser', JSON.stringify(this.message));
          this.toastr.success("Logged In","",{
            timeOut: 2000});
            this.loading = false;
          setTimeout(()=>{
            this.router.navigate(['/admin']);
          },1000);
        }else if(this.message.admin == 0)
        {
          this.loading = false;
          localStorage.setItem('currentUser', JSON.stringify(this.message));
          this.toastr.success("Logged In","",{
          timeOut: 2000});
          this.loading = false;
        setTimeout(()=>{
          this.router.navigate(['/home']);
        },1000);
       }else if(this.message.code == '204')
        { 
          this.loading = false;
          this.toastr.warning(this.message.success);
        }else{
          this.loading=false;
        this.toastr.error('User doesn\'t exists');
      }
   }
 }

}
