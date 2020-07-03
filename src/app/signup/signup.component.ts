import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpService } from '../services/http.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  togglePasswordText1: boolean;
  togglePasswordText2: boolean;
  signupForm: FormGroup;
  codeForm: FormGroup;
  errorMessage: any;
  successMessage: any;
  phase = 1;
  btnDisabled: boolean;
  validationMessages: {[key: string]: string};
  validationMessages2: {[key: string]: string};

  constructor(private http: HttpService) { 
    this.validationMessages = {
      fname: '',
      lname: '',
      email: '',
      pass1: '',
      pass2: ''
    }
    this.validationMessages2 = {
      code: ''
    }
  }

  ngOnInit() {
    this.loadForms();
    
  }

  loadForms() {
    let formGroup = new FormGroup({});
    formGroup.addControl('email', new FormControl('', Validators.required));
    formGroup.addControl('pass1', new FormControl('', Validators.required));
    formGroup.addControl('pass2', new FormControl('', Validators.required));
    formGroup.addControl('fname', new FormControl('', Validators.required));
    formGroup.addControl('lname', new FormControl('', Validators.required));
    this.signupForm = formGroup
    let formGroup2 = new FormGroup({});
    formGroup2.addControl('code', new FormControl('', Validators.required));
    this.codeForm = formGroup2
    setTimeout(() => {
      document.getElementById('fname').focus();
    }, 500)
  }

  togglePassword(name) {
    if(name == 'pass1') {
      this.togglePasswordText1 = !this.togglePasswordText1;
      document.getElementsByName(name).forEach(e=>{
        e.setAttribute('type', this.togglePasswordText1?'text': 'password')
      })
      }
    if(name == 'pass2') {
      this.togglePasswordText2 = !this.togglePasswordText2;
      document.getElementsByName(name).forEach(e=>{
        e.setAttribute('type', this.togglePasswordText2?'text': 'password')
      })
      }
  }

  public checkAllFields() {
    if(this.validationMessages.fname || this.validationMessages.lname
      || this.validationMessages.email || this.validationMessages.pass1
      || this.validationMessages.pass2) {
        return false;
      } else {
        return true;
      }
  }

  public checkAllFields2() {
    if(this.validationMessages2.code) {
        return false;
      } else {
        return true;
      }
  }

  verifyEmail() {
    if(this.signupForm.valid && this.checkAllFields()) {
      this.btnDisabled = true;
      const params = {
        fname: this.signupForm.controls.fname.value,
        email: this.signupForm.controls.email.value
      }
      this.http.signup('/user/verifyEmail', params)
      .subscribe((res: any) => {
        if(res.statusCode === 1) {
          this.phase = 2;
          this.successMessage = res.statusMessage;
          this.errorMessage = null;
          setTimeout(() => {
            document.getElementById('code').focus();
          }, 500)      
        } else {
          this.successMessage = null;
          this.errorMessage = res.statusMessage;
        }
        this.btnDisabled = false;
      })

    } else {
      this.validateForm(this.signupForm);
    }
  }

  public validateForm(form) {
    Object.keys(form.controls).forEach(element => {
      
      form.get(element).markAsTouched({onlySelf: true})
    });
  }

  verifyCode() {
    if(this.codeForm.valid && this.signupForm.valid && this.checkAllFields2()) {
      this.btnDisabled = true;
      const param = {
        pin: this.codeForm.controls.code.value,
        fname: this.signupForm.controls.fname.value,
        lname: this.signupForm.controls.lname.value,
        email: this.signupForm.controls.email.value,
        pass: this.signupForm.controls.pass1.value
      }

      this.http.signup('/user/signup', param)
      .subscribe((res: any) => {
        if(res.statusCode === 1) {
          this.phase = 3;
          this.signupForm.reset();
          this.codeForm.reset();
          this.successMessage = res.statusMessage;
          this.errorMessage = null;
        } else {
          this.successMessage = null;
          this.errorMessage = res.statusMessage;
        }
        this.btnDisabled = false;
      })
    }
  }

  public isFieldValid2(field) {
    if(field === 'code') {
      if(this.codeForm.get(field).errors && this.codeForm.get(field).errors['required']) {
        this.validationMessages2.code = "Verification code is required";
      } else if(this.codeForm.get(field).errors && this.codeForm.get(field).errors['pattern']){
        this.validationMessages2.code = "Invalid Verfification code format";
      } else {
        this.validationMessages2.code = null;
      }
    }

    return !this.codeForm.get(field).valid && this.codeForm.get(field).touched;
  }

  public isFieldValid(field) {
    if(field === 'fname') {
      if(this.signupForm.get(field).errors && this.signupForm.get(field).errors['required']) {
        this.validationMessages.fname = "First name is required";
      } else {
        this.validationMessages.fname = null;
      }
    }
    if(field === 'lname') {
      if(this.signupForm.get(field).errors && this.signupForm.get(field).errors['required']) {
        this.validationMessages.lname = "Last name is required";
      } else {
        this.validationMessages.lname = null;
      }
    }
    if(field === 'email') {
      if(this.signupForm.get(field).errors && this.signupForm.get(field).errors['required']) {
        this.validationMessages.email = "Email is required";
      } else {
        this.validationMessages.email = null;
      }
    }
    if(field === 'pass1') {
      if(this.signupForm.get(field).errors && this.signupForm.get(field).errors['required']) {
        this.validationMessages.pass1 = "Password is required";
      } else if(this.signupForm.get('pass1').value 
      && this.signupForm.get('pass2').value
      && this.signupForm.get('pass1').value !== this.signupForm.get('pass2').value) {
        this.validationMessages.pass1 = 'Passwords should match';
        return true;
      } else if(this.signupForm.get(field).errors && this.signupForm.get(field).errors['minlength']) {
        this.validationMessages.pass1 = "Minimum length is 6";
      } else {
        this.validationMessages.pass1 = null;
        return false;
      }
    }
    if(field === 'pass2') {
      if(this.signupForm.get(field).errors && this.signupForm.get(field).errors['required']) {
        this.validationMessages.pass2 = "Re-enter the password";
      } else if(this.signupForm.get('pass1').value 
      && this.signupForm.get('pass2').value
      && this.signupForm.get('pass1').value !== this.signupForm.get('pass2').value) {
        this.validationMessages.pass2 = 'Passwords should match';
        return true;
      } else if(this.signupForm.get(field).errors && this.signupForm.get(field).errors['minlength']) {
        this.validationMessages.pass2 = "Minimum length is 6";
      } else {
        this.validationMessages.pass2 = null;
      }
    }
    return !this.signupForm.get(field).valid && this.signupForm.get(field).touched;
  }

}
