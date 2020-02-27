import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GestionarReservaJugadorPage } from './gestionar-reserva-jugador';

@NgModule({
  declarations: [
    GestionarReservaJugadorPage,
  ],
  imports: [
    IonicPageModule.forChild(GestionarReservaJugadorPage),
  ],
})
export class GestionarReservaJugadorPageModule {}
