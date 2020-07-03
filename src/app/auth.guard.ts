import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UtilitiesService } from './services/utilities.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private utility: UtilitiesService) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      console.log('state', state)
    if(sessionStorage.getItem('userData') && JSON.parse(sessionStorage.getItem('userData')).token) {
      return true;
    } else {
      this.utility.requestedURL = state.url;
      this.router.navigate(['/login', {violation: true, violationMessage: 'Login to access EasyDonate'}])
      return false;
    }
  }
  
}
