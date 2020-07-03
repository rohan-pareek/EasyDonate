import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-reported-items',
  templateUrl: './reported-items.component.html',
  styleUrls: ['./reported-items.component.css']
})
export class ReportedItemsComponent implements OnInit {

  public reportedItems: any[];
  statusMessage: any;
  errorMessage: any;

  constructor(private httpService: HttpService) { }

  ngOnInit() {
    this.fetchReportedItems();
  }

  public fetchReportedItems() {
    const param = {}

    this.httpService.post('/report/getReportedItems', param)
    .subscribe((res: any) => {
      if(res.statusCode === 1) {
        this.reportedItems = res.data;
      }
    })

  }

  public delete(item) {
    console.log(item)
    const param = {
      itemID: item._id
    }
    this.httpService.post('/report/deleteReportedItem', param)
    .subscribe((res: any) => {
      if(res.statusCode === 1) {
        this.statusMessage = res.statusMessage;
        this.errorMessage = null;
        this.fetchReportedItems();
      } else {
        this.statusMessage = null;
        this.errorMessage = res.statusMessage;
      }
    })
  }

}
