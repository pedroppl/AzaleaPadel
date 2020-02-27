import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { InformacionJugadorPage } from './informacion-jugador';

@NgModule({
  declarations: [
    InformacionJugadorPage,
  ],
  imports: [
    IonicPageModule.forChild(InformacionJugadorPage),
  ],
})
export class InformacionJugadorPageModule {}
