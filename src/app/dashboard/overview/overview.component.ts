import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';
import { DashboardService } from '../dashboard.service';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})
export class OverviewComponent implements OnInit {

  donations = {
    data: [],
    total: 0
  }
  donationSearch;
  
  constructor(private http: HttpService, private dashboardService: DashboardService) { }
  

  ngOnInit() {
    this.fetchDonations();
  }

  fetchDonations() {
    this.http.post('/donation/getDonations', {})
    .subscribe((res: any) => {
      if(res.statusCode === 1) {
        this.donations.data = res.data;
        this.donations.total = res.data.length;
        this.dashboardService.setAllDonations(res.data);
      }
    })
  }


}
