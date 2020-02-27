import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AgregarReservaJugadorPage } from './agregar-reserva-jugador';

@NgModule({
  declarations: [
    AgregarReservaJugadorPage,
  ],
  imports: [
    IonicPageModule.forChild(AgregarReservaJugadorPage),
  ],
})
export class AgregarReservaJugadorPageModule {}
