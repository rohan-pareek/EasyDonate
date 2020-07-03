import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UtilitiesService } from '../services/utilities.service';
import { HttpService } from '../services/http.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public loginForm: FormGroup;
  public errorMessage;
  btnDisabled: boolean;
  public validationMessages: {[key: string]: string};

  constructor(private http: HttpService, private router: Router, private utility: UtilitiesService,
    private activatedRoute: ActivatedRoute) {
    this.errorMessage = this.activatedRoute.snapshot.paramMap.get('violationMessage');
    this.validationMessages = {
      email: '',
      pass: ''
    }
  }

  ngOnInit() {
    this.loadForm();
    if(this.utility.isLoggedin()) {
      this.router.navigate(['/dashboard']);
    }
  }

  public loadForm() {
    let formGroup = new FormGroup({});
    formGroup.addControl('email', new FormControl('', Validators.required));
    formGroup.addControl('pass', new FormControl('', Validators.required));
    this.loginForm = formGroup;
    setTimeout(() => {
      document.getElementById('email').focus();
    }, 500)
  }

  login() {
    if(this.loginForm.valid && this.checkAllFields()) {
      this.btnDisabled = true;
      const params = {
        email: this.loginForm.controls.email.value,
        pass: this.loginForm.controls.pass.value
      }
      this.http.login('/user/login', params)
      .subscribe((res: any) => {
        if(res.statusCode === 1) {
          this.errorMessage = null;
          sessionStorage.setItem('userData', JSON.stringify(res.data))
          this.utility.isAuthenticated.next(true)
          if(this.utility.requestedURL) {
            this.router.navigate([this.utility.requestedURL]);
          } else {
            this.router.navigate(['/dashboard']);
          }
        } else {
          this.errorMessage = res.statusMessage;
        }
        this.btnDisabled = false;
      })
    }
  }

  isFieldValid(field) {
    if(field === 'email') {
      if(this.loginForm.get(field).errors && this.loginForm.get(field).errors['required']) {
        this.validationMessages.email = 'Email is required';
      } else {
        this.validationMessages.email = null;
      }
    }

    if(field === 'pass') {
      if(this.loginForm.get(field).errors && this.loginForm.get(field).errors['required']) {
        this.validationMessages.pass = 'Password is required';
      } else {
        this.validationMessages.pass = null;
      }
    }

    return !this.loginForm.get(field).valid && this.loginForm.get(field).touched;
  }

  public checkAllFields() {
    if(this.validationMessages.email || this.validationMessages.pass) {
        return false;
      } else {
        return true;
      }
  }

}
