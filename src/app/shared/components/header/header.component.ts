import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { UtilitiesService } from 'src/app/services/utilities.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @ViewChild('ham') ham: ElementRef
  hamToggle: boolean;
  isAuthenticated: boolean;
  userData;

  constructor(private utility: UtilitiesService, private router:Router) { }

  ngOnInit() {
    this.utility.isAuthenticated.subscribe(res => {
      this.isAuthenticated = res;
      if(this.isAuthenticated) {
        this.userData = JSON.parse(sessionStorage.getItem('userData')).user;
      }
    })
  }

  toggleNav() {
    this.hamToggle = !this.hamToggle
    this.ham.nativeElement.style.display = this.hamToggle? "block": "none"
  }

}
