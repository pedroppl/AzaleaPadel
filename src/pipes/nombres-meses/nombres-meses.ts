import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the NombresMesesPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'nombresMeses',
})
export class NombresMesesPipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  nombresMeses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio','Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

  transform(value: string, ...args) {
    return this.nombresMeses[value];
  }
}
