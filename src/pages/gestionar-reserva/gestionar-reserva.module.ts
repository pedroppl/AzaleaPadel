import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GestionarReservaPage } from './gestionar-reserva';

@NgModule({
  declarations: [
    GestionarReservaPage,
  ],
  imports: [
    IonicPageModule.forChild(GestionarReservaPage),
  ],
})
export class GestionarReservaPageModule {}
