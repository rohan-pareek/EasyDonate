import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpService } from '../services/http.service';
import { UtilitiesService } from '../services/utilities.service';

@Component({
  selector: 'app-donate',
  templateUrl: './donate.component.html',
  styleUrls: ['./donate.component.css']
})
export class DonateComponent implements OnInit {

  thumbnailURL = '../../assets/file_upload_background.jpg';
  img1URL = '../../assets/file_upload_background.jpg';
  img2URL = '../../assets/file_upload_background.jpg';
  img3URL = '../../assets/file_upload_background.jpg';
  img4URL = '../../assets/file_upload_background.jpg';
  donateForm;
  thumbnailFile: any;
  img1File: any;
  img2File: any;
  img3File: any;
  img4File: any;
  successMessage: any;
  errorMessage: any;
  disableSave: boolean;
  validationMessages: {[key: string]: string};

  constructor(private httpService: HttpService, private utility: UtilitiesService) { 
    this.validationMessages = {
      title: '',
      description: '',
      address1: '',
      address2: '',
      city: '',
      state: '',
      zip: '',
      thumbnail: '',
      img1: '',
      img2: '',
      img3: '',
      img4: ''
    }
  }

  ngOnInit() {
    this.loadForm();
  }

  loadForm() {
    let formGroup = new FormGroup({});
    formGroup.addControl('thumbnail', new FormControl('', Validators.required));
    formGroup.addControl('title', new FormControl('', Validators.required));
    formGroup.addControl('description', new FormControl('', Validators.required));
    formGroup.addControl('access', new FormControl('public'));
    formGroup.addControl('address1', new FormControl('', Validators.required));
    formGroup.addControl('address2', new FormControl('', Validators.required));
    formGroup.addControl('city', new FormControl('', Validators.required));
    formGroup.addControl('state', new FormControl('', Validators.required));
    formGroup.addControl('zip', new FormControl('', Validators.required));
    formGroup.addControl('img1', new FormControl(''));
    formGroup.addControl('img2', new FormControl(''));
    formGroup.addControl('img3', new FormControl(''));
    formGroup.addControl('img4', new FormControl(''));
    this.donateForm = formGroup;
  }

  thumbnailChange(event) {
    if (event && event.target && event.target.files && event.target.files.length) {
      let file = event.target.files[0];
      if(file.type === 'image/png' || file.type === 'image/jpeg' || file.type === 'image/jpg') {
        this.thumbnailFile = file;

        let reader = new FileReader();
  
        reader.onload = (e: any) => {
          this.thumbnailURL = e.target.result;
        }
  
        reader.readAsDataURL(file);
  
      } else {
        this.thumbnailURL = '../../assets/file_upload_background.jpg';
      }
    } else {
      this.thumbnailFile = undefined;
      this.thumbnailURL = '../../assets/file_upload_background.jpg';
    }
  }

  img1Change(event) {
    if (event && event.target && event.target.files && event.target.files.length) {
      let file = event.target.files[0];
      this.img1File = file;

      let reader = new FileReader();

      reader.onload = (e: any) => {
        this.img1URL = e.target.result;
      }

      reader.readAsDataURL(file);
    } else {
      this.img1File = undefined;
      this.img1URL = '../../assets/file_upload_background.jpg';
    }
  }

  img2Change(event) {
    if (event && event.target && event.target.files && event.target.files.length) {
      let file = event.target.files[0];
      this.img2File = file;

      let reader = new FileReader();

      reader.onload = (e: any) => {
        this.img2URL = e.target.result;
      }

      reader.readAsDataURL(file);
    } else {
      this.img2File = undefined;
      this.img2URL = '../../assets/file_upload_background.jpg';
    }
  }

  img3Change(event) {
    if (event && event.target && event.target.files && event.target.files.length) {
      let file = event.target.files[0];
      this.img3File = file;

      let reader = new FileReader();

      reader.onload = (e: any) => {
        this.img3URL = e.target.result;
      }

      reader.readAsDataURL(file);
    } else {
      this.img3File = undefined;
      this.img3URL = '../../assets/file_upload_background.jpg';
    }
  }

  img4Change(event) {
    if (event && event.target && event.target.files && event.target.files.length) {
      let file = event.target.files[0];
      this.img4File = file;

      let reader = new FileReader();

      reader.onload = (e: any) => {
        this.img4URL = e.target.result;
      }

      reader.readAsDataURL(file);
    } else {
      this.img4File = undefined;
      this.img4URL = '../../assets/file_upload_background.jpg';
    }
  }

  saveDonation() {
    if(this.donateForm.valid) {
      this.disableSave = true;
      const form = this.donateForm.controls;
      const formData = new FormData();
      formData.append('thumbnail', this.thumbnailFile);
      formData.append('img1', this.img1File);
      formData.append('img2', this.img2File);
      formData.append('img3', this.img3File);
      formData.append('img4', this.img4File);
      formData.append('title', form.title.value);
      formData.append('description', form.description.value);
      formData.append('address1', form.address1.value);
      formData.append('address2', form.address2.value);
      formData.append('city', form.city.value);
      formData.append('state', form.state.value);
      formData.append('zip', form.zip.value);
      formData.append('access', form.access.value);
      formData.append('owner', this.utility.returnUser().fname + ' ' + this.utility.returnUser().lname);
      formData.append('ownerEmail', this.utility.returnUser().email);
      this.httpService.post('/donation/addDonation', formData)
        .subscribe((res: any) => {
          if (res.statusCode === 1) {
            this.successMessage = res.statusMessage;
            this.errorMessage = null;
            this.thumbnailURL = '../../assets/file_upload_background.jpg';
            this.img1URL = '../../assets/file_upload_background.jpg';
            this.img2URL = '../../assets/file_upload_background.jpg';
            this.img3URL = '../../assets/file_upload_background.jpg';
            this.img4URL = '../../assets/file_upload_background.jpg';
            this.donateForm.reset();
          } else {
            this.successMessage = null;
            this.errorMessage = res.statusMessage;
          }
          this.disableSave = false;
        })  
    } else {
      this.validateAllFields(this.donateForm);
    }
  }

  public validateAllFields(form) {
    Object.keys(form.controls).forEach(control => {
      form.get(control).markAsTouched({onlySelf: true})
      form.get(control).markAsDirty({onlySelf: true})
    })
  }

  public isFieldValid(field) {
    if(field === 'title') {
      if(this.donateForm.get(field).errors && this.donateForm.get(field).errors['required']) {
        this.validationMessages.title = "Title is required";
      } else {
        this.validationMessages.title = null;
      }
    }

    if(field === 'thumbnail') {
      if(this.donateForm.get(field).errors && this.donateForm.get(field).errors['required']) {
        this.validationMessages.thumbnail = "Thumbnail is required";
      } else {
        this.validationMessages.thumbnail = null;
      }
    }

    if(field === 'description') {
      if(this.donateForm.get(field).errors && this.donateForm.get(field).errors['required']) {
        this.validationMessages.description = "Description is required";
      } else {
        this.validationMessages.description = null;
      }
    }

    if(field === 'address1') {
      if(this.donateForm.get(field).errors && this.donateForm.get(field).errors['required']) {
        this.validationMessages.address1 = "Address Line 1 is required";
      } else {
        this.validationMessages.address1 = null;
      }
    }

    if(field === 'address2') {
      if(this.donateForm.get(field).errors && this.donateForm.get(field).errors['required']) {
        this.validationMessages.address2 = "Address Line 2 is required";
      } else {
        this.validationMessages.address2 = null;
      }
    }

    if(field === 'city') {
      if(this.donateForm.get(field).errors && this.donateForm.get(field).errors['required']) {
        this.validationMessages.city = "City is required";
      } else {
        this.validationMessages.city = null;
      }
    }

    if(field === 'state') {
      if(this.donateForm.get(field).errors && this.donateForm.get(field).errors['required']) {
        this.validationMessages.state = "State is required";
      } else {
        this.validationMessages.state = null;
      }
    }

    if(field === 'zip') {
      if(this.donateForm.get(field).errors && this.donateForm.get(field).errors['required']) {
        this.validationMessages.zip = "Zip is required";
      } else if(this.donateForm.get(field).errors && this.donateForm.get(field).errors['pattern']) {
        this.validationMessages.zip = "Invalid Zip format";
      } else {
        this.validationMessages.zip = null;
      }
    }

    return field === 'thumbnail'?!this.donateForm.get(field).valid && this.donateForm.get(field).dirty
           :!this.donateForm.get(field).valid && this.donateForm.get(field).touched;
  }

}
