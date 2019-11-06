import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders} from '@angular/common/http';
import { environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminServicesService {
  api_url;
  base_url;

  constructor() { 
      this.api_url = environment.api_url;
      this.base_url = environment.base_url;
  }



  logout() {
    localStorage.removeItem('currentUser');
  }
}
