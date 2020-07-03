import { Component, OnInit } from '@angular/core';
import { UtilitiesService } from '../services/utilities.service';
import { Router } from '@angular/router';
import { HttpService } from '../services/http.service';
import  config  from '../shared/config';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  public userData;
  avatarURL: any;
  avatarFile: any;
  successMessage: any;
  errorMessage: any;

  constructor(private utility: UtilitiesService, private router: Router, private httpService: HttpService) { }

  ngOnInit() {
    this.userData = this.utility.returnUser();
  }

  logout() {
    sessionStorage.removeItem('userData');
    this.utility.isAuthenticated.next(false);
    this.userData = null;
    this.utility.requestedURL = null;
    this.router.navigate(['/']);
  }

  avatarChange(event) {
    if (event && event.target && event.target.files && event.target.files.length) {
      let file = event.target.files[0];
      if(file.type === 'image/png' || file.type === 'image/jpeg' || file.type === 'image/jpg') {
        this.avatarFile = file;

        let reader = new FileReader();
        const formData = new FormData();
        formData.append('avatar', this.avatarFile);
        formData.append('email', this.userData.email);
        this.httpService.post('/user/updateAvatar', formData)
          .subscribe((res: any) => {
            if(res.statusCode === 1) {
              this.successMessage = res.statusMessage;
              this.errorMessage = null;
              let userData = JSON.parse(sessionStorage.getItem('userData'));
              userData.user.avatar = config.publicURL + '/' + res.data.avatar;
              sessionStorage.setItem('userData', JSON.stringify(userData));
              this.userData = this.utility.returnUser();
              this.utility.isAuthenticated.next(true)
            } else {
              this.successMessage = null;
              this.errorMessage = res.statusMessage;
            }
          })
  
        reader.onload = (e: any) => {
          this.avatarURL = e.target.result;
          
        }
  
        reader.readAsDataURL(file);
  
      } else {
        this.avatarURL = this.userData.avatar;
      }
    } else {
      this.avatarFile = undefined;
      this.avatarURL = this.userData.avatar;
    }
  }

}
