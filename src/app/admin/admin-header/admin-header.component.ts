import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {  DataService } from '../../_services/data.service';


@Component({
  selector: 'app-admin-header',
  templateUrl: './admin-header.component.html',
  styleUrls: ['./admin-header.component.css']
})
export class AdminHeaderComponent implements OnInit {
name;
public searchitem:string="";
searchdata:any=[];

  constructor(
    private router: Router,
    private dataService:DataService,
  ) { }

  ngOnInit() {
    let user=JSON.parse(localStorage.getItem('currentUser'));
   this.name=user.first_name+' '+user.last_name;
  }

  async searchblogs(event){
    this.searchitem = event.target.value;
    this.searchdata = await this.dataService.searchblogs(this.searchitem);
    this.dataService.inSearchData(this.searchdata);
    this.router.navigate(['/admin/blogs'],{ queryParams: { search: this.searchitem} });   
   }


  logout(){
    this.dataService.logout();
    this.router.navigate(['']);
  }

}
