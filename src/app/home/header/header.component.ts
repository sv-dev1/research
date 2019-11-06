import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {  AdminServicesService } from '../../admin/admin-services.service';
import {  DataService } from '../../_services/data.service';
import { ToastrService } from 'ngx-toastr';
import { environment} from '../../../environments/environment';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  name;
  img_url;
  userId;
  profile_pic;
  picId:string="";
  public searchitem:string="";
  searchdata:any=[];

  constructor(
    private router: Router,
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
   if(localStorage.getItem('profile_pic') != ''){
    this.profile_pic=this.img_url+''+JSON.parse(localStorage.getItem('profile_pic'));
   }
   this.getProfilePhoto();
  }


  profile(){
    this.router.navigate(['profile']);
  }


  async getProfilePhoto(){

    let photo=await this.dataService.getUserProfilePic(this.userId);
    if(photo == ''){
      localStorage.setItem('profile_pic',JSON.stringify('/research/uploads/9155719756'));
      this.profile_pic= this.img_url+'/research/uploads/9155719756';
    }else{
      localStorage.setItem('profile_pic',JSON.stringify(photo[0].profile_pic));
      this.profile_pic=this.img_url+''+photo[0].profile_pic;
      this.picId=photo[0].photoId;
    }
}

   async searchblogs(event){
    this.searchitem = event.target.value;
    this.searchdata = await this.dataService.searchblogs(this.searchitem);
    this.dataService.inSearchData(this.searchdata);
    this.router.navigate(['/home'],{ queryParams: { search: this.searchitem} });   
   }

  logout(){
    this.dataService.logout();
    this.router.navigate(['']);
  }

}
