import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UtilitiesService {

  isAuthenticated = new BehaviorSubject<any>(false);
  requestedURL;

  constructor() { 
    if(sessionStorage.getItem('userData') && JSON.parse(sessionStorage.getItem('userData')).token) {
      this.isAuthenticated.next(true);
    } else {
      this.isAuthenticated.next(false);
    }
  }

  public isLoggedin() {
    if(sessionStorage.getItem('userData') && JSON.parse(sessionStorage.getItem('userData')).token) {
      return true;
    } else {
      return false;
    }
  }

  public returnUser() {
    return sessionStorage.getItem('userData')? JSON.parse(sessionStorage.getItem('userData')).user: null;
  }
}
