import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';
import { UtilitiesService } from 'src/app/services/utilities.service';

@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.css']
})
export class RequestsComponent implements OnInit {

  public requests: any[] = [];
  public outgoingRequests: any[] = [];

  constructor(private http: HttpService, private utility: UtilitiesService) { }

  ngOnInit() {
    this.getRequests();
    this.getOutgoingRequests();
  }

  public getRequests() {
    const param = {
      ownerEmail: this.utility.returnUser().email
    }
    this.http.post('/request/getRequests', param)
      .subscribe((res: any) => {
        if (res.statusCode === 1) {
          this.requests = res.data.map(elem => {
            if (elem.status) {
              switch (elem.status) {
                case 'P':
                  elem.status = elem.status + ' - Pending';
                  break;
                case 'R':
                  elem.status = elem.status + ' - Rejected';
                  break;
                case 'A':
                  elem.status = elem.status + ' - Approved';
                  break;
              }
            }
            return elem;
          });
        }
      })
  }

  public getOutgoingRequests() {
    const param = {
      receptorEmail: this.utility.returnUser().email
    }
    this.http.post('/request/getRequests', param)
      .subscribe((res: any) => {
        if (res.statusCode === 1) {
          this.outgoingRequests = res.data.map(elem => {
            if (elem.status) {
              switch (elem.status) {
                case 'P':
                  elem.status = elem.status + ' - Pending';
                  break;
                case 'R':
                  elem.status = elem.status + ' - Rejected';
                  break;
                case 'A':
                  elem.status = elem.status + ' - Approved';
                  break;
              }
            }
            return elem;
          });
        }
      })
  }

  public updateRequest(requestID, status) {
    const param = {
      requestID,
      status
    }
    this.http.post('/request/updateRequest', param)
    .subscribe((res: any) => {
      if(res.statusCode === 1) {
        this.getRequests();
      }
    })
  }

}
