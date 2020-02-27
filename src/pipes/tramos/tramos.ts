import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the TramosPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'tramos',
})
export class TramosPipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */

  tramos = ['','1 hora', '1 hora y 30 minutos', '2 horas'];

  transform(value: string, ...args) {
    return this.tramos[value];
  }
}
