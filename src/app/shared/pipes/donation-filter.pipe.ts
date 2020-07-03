import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'donationFilter'
})
export class DonationFilterPipe implements PipeTransform {

  transform(donations: any[], donation?: any): any {
    if(donation) {
      return donations.filter(elem => {
        return (((elem.title.toLowerCase().indexOf(donation? donation.toLowerCase(): null) !== -1)
        || (elem.description.toLowerCase().indexOf(donation? donation.toLowerCase(): null) !== -1)
        || (elem.owner.toLowerCase().indexOf(donation? donation.toLowerCase(): null) !== -1)))
      })  
    } else {
      return donations;
    }
  }

}
