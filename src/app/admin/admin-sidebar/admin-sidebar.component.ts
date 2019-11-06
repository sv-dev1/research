import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-sidebar',
  templateUrl: './admin-sidebar.component.html',
  styleUrls: ['./admin-sidebar.component.css']
})
export class AdminSidebarComponent implements OnInit {
 name;
  constructor() { }

  ngOnInit() {
   let user=JSON.parse(localStorage.getItem('currentUser'));
   this.name=user.first_name+' '+user.last_name;
  }

}
