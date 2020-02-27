import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the DiasSemanaPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'diasSemana',
})
export class DiasSemanaPipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  diasSemana = ['Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado'];

  transform(value: string, ...args) {
    return this.diasSemana[value];
  }
}
