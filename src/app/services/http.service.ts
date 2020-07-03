import { Injectable } from '@angular/core';
import  config  from '../shared/config';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import {map} from 'rxjs/operators'
import { Router } from '@angular/router';
import { UtilitiesService } from './utilities.service';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient, private router: Router, private utility: UtilitiesService) { 
    
  }

  public login(url, data) {
    const apiURL = config.baseURL + url; 
    return this.http.post(apiURL, data);
  }

  public signup(url, data) {
    const apiURL = config.baseURL + url; 
    return this.http.post(apiURL, data);
  }

  public post(url, data) {
    const apiURL = config.baseURL + url; 
    const headers = new HttpHeaders({
      'Authorization': sessionStorage.getItem('userData')? 'Bearer ' +JSON.parse(sessionStorage.getItem('userData')).token: ''
    })
    return this.http.post(apiURL, data, {headers})
    .pipe(
      map(res => {
        this.handleError(res);
        return res
      })
    );
  }

  public handleError(res) {
    if(res.statusCode === 2) {
      sessionStorage.removeItem('userData');
    this.utility.isAuthenticated.next(false);
    this.utility.requestedURL = null;
    this.router.navigate(['/']);
      this.router.navigate(['/login', {violation: true, violationMessage: res.statusMessage}])
      return;
    } else {
      return;
    }
  }

}
