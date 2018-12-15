import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the SearchDonarPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'searchDonar',
})
export class SearchDonarPipe implements PipeTransform {
  public transform(value, keys: string, term: string) {
    console.log(value, term, keys);
    if (!term) return value;
    return (value || []).filter((item) => keys.split(',').some(key => item.hasOwnProperty(key) && new RegExp(term, 'gi').test(item[key])));

  }
}
