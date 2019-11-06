import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import {  DataService } from '../../_services/data.service';

@Component({
  selector: 'app-admin-blogs',
  templateUrl: './admin-blogs.component.html',
  styleUrls: ['./admin-blogs.component.css']
})
export class AdminBlogsComponent implements OnInit {
  blogs:any;
  searchResult:boolean=false;
  searchdata:any=[];
  searchItem:string='';
  loading=false;

  constructor(
    private dataService: DataService,
    private router: Router,
    private route: ActivatedRoute
  ) { 
    this.route.queryParams.subscribe(params => {
      this.searchItem = params['search'];
      console.log(this.searchItem);
      this.getData(this.searchItem);
    });
  }

  ngOnInit() {
    let user=JSON.parse(localStorage.getItem('currentUser')); 
    this.allBlogs();
    this.getSearchData();
  }
  
  async allBlogs(){
    this.loading=true;
    this.blogs=await this.dataService.getAllBlogs();
    this.loading=false;

   } 

   async getData(item){
    let res = await this.dataService.searchblogs(item);
     if(res['code']==200){
      this.searchResult=true;
       this.searchdata=res['body'];
     }
  }

  getSearchData(){
    this.dataService.inputData1$.subscribe(res=>{
      if(res['code'] == 200){
        this.searchResult=true;
        this.searchdata=res['body'];
      }
    }) 
  }

  
}
