import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';
import { UtilitiesService } from 'src/app/services/utilities.service';
import { DashboardService } from '../dashboard.service';

@Component({
  selector: 'app-donations',
  templateUrl: './donations.component.html',
  styleUrls: ['./donations.component.css']
})
export class DonationsComponent implements OnInit {

  private donations: any[] = [];

  constructor(private http: HttpService, private utility: UtilitiesService,
    private dashboardService: DashboardService) { }

  ngOnInit() {
    this.getDonations();
  }

  public getDonations() {
    const param = {
      ownerEmail: this.utility.returnUser().email
    }
    this.http.post('/donation/getDonations', param)
    .subscribe((res: any) => {
      if(res.statusCode === 1) {
        this.donations = res.data;
      }
    })
  }

  public deleteDonation(donationID) {
    const param = {
      donationID
    }
    this.http.post('/donation/deleteDonation', param)
    .subscribe((res: any) => {
      if(res.statusCode === 1) {
        this.dashboardService.deleteDonation(donationID);
        this.getDonations();
      }
    })
  }

}
