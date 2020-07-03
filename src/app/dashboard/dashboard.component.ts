import { Component, OnInit } from '@angular/core';
import { HttpService } from '../services/http.service';
import { DashboardService } from './dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  donations = {
    data: [],
    total: 0
  }

  constructor(private http: HttpService, private dashboardService: DashboardService) { 
    this.dashboardService.allDonations
    .subscribe(res=>{
      console.log('res', res)
      let tempArray = [...res];
      this.donations.data = tempArray? tempArray.reverse().slice(0, 5): [];
      this.donations.total = tempArray?tempArray.length: 0;
    })
  }

  ngOnInit() {
    this.fetchDonations()
  }

  
  fetchDonations() {
    this.http.post('/donation/getDonations', {})
    .subscribe((res: any) => {
      if(res.statusCode === 1) {
        this.donations.data = res.data.reverse().slice(0, 5);
        this.donations.total = res.data.length
        console.log('donation rev', this.donations)

      }
    })
  }


}
