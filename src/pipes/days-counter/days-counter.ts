import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';
/**
 * Generated class for the DaysCounterPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'daysCounter',
})
export class DaysCounterPipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform(date1: any, ...args) {
    var date2 = new Date(); 
    console.log('Number of Days', (moment(date2).diff(moment(date1), 'days')) >=  90);
    return (moment(date2).diff(moment(date1), 'days')) >=  90 ? false: true;
    // console.log('Number of Days', (moment(date2).diff(moment(date1), 'days')) >=  90);
    // if((moment(date1).diff(moment(date2), 'days')) >= 90)
    // {
    //   return 'Yes';
    // } else {
    //   return 'No';
    // } 
  }
}
