import { Injectable } from '@angular/core';
import { CanActivate,Router, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserAuthGuard implements CanActivate {
  constructor(private router: Router) { }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      var auth = JSON.parse(localStorage.getItem('currentUser'));
      if (localStorage.getItem('currentUser') && typeof auth.admin != 'undefined' && auth.admin == 0) {
          return true;
      }else{
        this.router.navigate(['login']); 
          return false;
      } 
  }
  
}
