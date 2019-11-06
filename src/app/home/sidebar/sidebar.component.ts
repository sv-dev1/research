import { Component, OnInit } from '@angular/core';
import {  DataService } from '../../_services/data.service';
import { ToastrService } from 'ngx-toastr';
import { environment} from '../../../environments/environment';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  name;
  img_url;
  profile_pic:string="";
  picId:string="";
  userId:string="";
  local_userId;
  file:any;
  constructor(
    private dataService:DataService,
    private toastr: ToastrService,
  ) {
    this.img_url = environment.img_url;
    this.dataService.detectChange().subscribe(() =>{
      this.dataService.inputData$.subscribe(data => {
        if(data != null){
          this.profile_pic = data;
        }
      })
    })
   }

  ngOnInit() {
    let user=JSON.parse(localStorage.getItem('currentUser'));
   this.name=user.first_name+' '+user.last_name;
   this.userId=user.user_ledgerid;
   this.local_userId=user.id;
   if(localStorage.getItem('profile_pic') != ''){
    this.profile_pic=this.img_url+''+JSON.parse(localStorage.getItem('profile_pic'));
   }
   this.getProfilePhoto();
  }

 async getProfilePhoto(){

  let photo=await this.dataService.getUserProfilePic(this.userId);
    if(photo == ''){
      this.profile_pic= this.img_url+'/research/uploads/9155719756';
    }else{
      this.profile_pic=this.img_url+''+photo[0].profile_pic;
      this.picId=photo[0].photoId;
    }
  
 }

  fileChange(file,pid) {
    this.file = file.target.files[0];
    //console.log(this.file);
    var strFileName = this.getFileExtension1(this.file.name);
    if(strFileName != 'jpeg' && strFileName != 'png' && strFileName != 'jpg'){
      this.toastr.warning("Please select valid profile image.",'', {
        timeOut: 3000
      });
      return;
      }
    var input_data = {
    "userID": this.local_userId,
    "ledgerID":this.userId,
    "profilePic": this.file == undefined ? "" : this.file
    }
   // console.log(input_data);
    const formData = new FormData();
    formData.append('userID',input_data.userID);
    formData.append('ledgerID',input_data.ledgerID);
    formData.append('profilePic', input_data.profilePic);
    this.dataService.uploadUserProfilePic(formData).subscribe((response)=>{
   //  console.log(response);
     if(response['code']=="200"){
      this.dataService.updateProfilePicOnLedger(this.userId,response['img']).subscribe(res=>{
        this.picId=res['photoId'];
        this.profile_pic=this.img_url+''+res['profile_pic'];
        this.dataService.inData(this.profile_pic);
        this.dataService.changeSub.next('change');
        this.toastr.success(response['success'],'', {
          timeOut: 2000
        });
      },error=>{
        this.toastr.error("Something Went Wrong!",'', {
          timeOut: 3000
        });
      })
     }else if(response['code']=="201"){
     // console.log("PID"+pid);
      this.dataService.changeProfilePic(this.userId,pid,response['img']).subscribe(res=>{
        this.picId=res['photoId'];
        this.profile_pic=this.img_url+''+res['profile_pic'];
        this.dataService.inData(this.profile_pic);
        this.dataService.changeSub.next('change');
        this.toastr.success(response['success'],'', {
          timeOut: 1000
        });
      },error=>{
        this.toastr.error("Something Went Wrong!",'', {
          timeOut: 3000
        });
      })
     }else{
      this.toastr.error(response['Error'],'', {
        timeOut: 3000
      });
     }

    },error=>{
      console.log(error);
    })
    }

    getFileExtension1(filename) {
      return (/[.]/.exec(filename)) ? /[^.]+$/.exec(filename)[0] : undefined;
      }

}
