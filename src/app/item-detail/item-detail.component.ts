import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpService } from '../services/http.service';
import { UtilitiesService } from '../services/utilities.service';

@Component({
  selector: 'app-item-detail',
  templateUrl: './item-detail.component.html',
  styleUrls: ['./item-detail.component.css']
})
export class ItemDetailComponent implements OnInit {

  public errorMessage;
  public donation;
  public sameUser: boolean = true;
  public itemRequested: boolean = true;
  public successMessage: any;
  public disableReport: boolean = true;

  constructor(private router: ActivatedRoute, private httpService: HttpService, private utility: UtilitiesService) {
    const donationID = router.snapshot.paramMap.get('id');
    if (donationID && donationID.length === 24) {
      this.getDonation(donationID);
    } else {
      this.errorMessage = "Item not found"
    }
  }

  ngOnInit() {
  }

  public getDonation(id) {
    const param = {
      donationID: id
    }
    this.httpService.post('/donation/getDonations', param)
      .subscribe((res: any) => {
        if (res.statusCode === 1) {
          if (res.data.length === 0) {
            this.errorMessage = 'Item not found'
          } else {
            this.donation = res.data[0];
            this.checkItemRequest(this.donation);
            this.fetchReportedItems();
            if (this.donation.ownerEmail === this.utility.returnUser().email) {
              this.sameUser = true;
            } else {
              this.sameUser = false;
            }
          }
        } else {
          this.errorMessage = res.statusMessage;
        }
      })
  }

  requestItem(item) {
    this.itemRequested = true;
    const param = {
      itemTitle: item.title,
      itemID: item._id,
      owner: item.owner,
      ownerEmail: item.ownerEmail,
      receptor: this.utility.returnUser().fname + ' ' + this.utility.returnUser().lname,
      receptorEmail: this.utility.returnUser().email
    }
    this.httpService.post('/request/addRequest', param)
      .subscribe((res: any) => {
        if (res.statusCode === 1) {
          this.successMessage = res.statusMessage;
          this.errorMessage = null;
          this.checkItemRequest(this.donation);
        } else {
          this.successMessage = null;
          this.errorMessage = res.statusMessage
        }
      })
  }

  public checkItemRequest(item) {
    const param = {
      itemID: item._id,
      requestedBy: this.utility.returnUser().email
    }
    this.httpService.post('/request/checkItemRequest', param)
      .subscribe((res: any) => {
        if (res.statusCode == 1) {
          if (res.data.length == 0) {
            this.itemRequested = false;
          } else {
            this.itemRequested = true;
          }
        } else {
          this.itemRequested = false;
        }
      })
  }

  public report() {
    this.disableReport = true;
    const param = {
      itemID: this.donation._id,
      itemTitle: this.donation.title,
      reporter: this.utility.returnUser().fname + ' ' + this.utility.returnUser().lname,
      reporterEmail: this.utility.returnUser().email,
      owner: this.donation.owner,
      ownerEmail: this.donation.ownerEmail
    }
    this.httpService.post('/report/reportItem', param)
      .subscribe((res: any) => {
        if (res.statusCode === 1) {
          this.successMessage = res.statusMessage;
          this.errorMessage = null;
        } else {
          this.successMessage = null;
          this.errorMessage = res.statusMessage;
          this.disableReport = false;
        }
      })
  }

  public fetchReportedItems() {
    const param = {
      itemID: this.donation._id,
      // ownerEmail: this.donation.ownerEmail,
      // reporterEmail: this.utility.returnUser().email
    }

    this.httpService.post('/report/getReportedItems', param)
      .subscribe((res: any) => {
        if (res.statusCode === 1) {
          if(res.data.length) {
            res.data.forEach(element => {
              if (element.ownerEmail.indexOf(this.utility.returnUser().email) !== -1
                ||element.reporterEmail.indexOf(this.utility.returnUser().email) !== -1) {
                this.disableReport = true;
              } else {
                this.disableReport = false;
              }
            });
          } else {
            this.disableReport = false;
          }
        } else {
          this.disableReport = true;
        }
      })

  }


}
