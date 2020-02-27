import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AgregarJugadorPage } from './agregar-jugador';

@NgModule({
  declarations: [
    AgregarJugadorPage,
  ],
  imports: [
    IonicPageModule.forChild(AgregarJugadorPage),
  ],
})
export class AgregarJugadorPageModule {}
