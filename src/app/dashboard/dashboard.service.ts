import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  allDonations = new BehaviorSubject<any>([]);

  constructor() {}

  public setAllDonations(allDonations) {
      this.allDonations.next(allDonations);
  }

  public returnAllDonations() {
    return this.allDonations.asObservable();
  }

  public async deleteDonation(donationID) {
      let tempArr;
      await this.allDonations.subscribe(res=> 
        {
            tempArr = [...res];
            tempArr.splice(tempArr.findIndex((e) => {
                return e._id === donationID;
            }), 1);
        });
        this.allDonations.next(tempArr);      
  }
}
