import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HomeJugadorPage } from './home-jugador';

@NgModule({
  declarations: [
    HomeJugadorPage,
  ],
  imports: [
    IonicPageModule.forChild(HomeJugadorPage),
  ],
})
export class HomeJugadorPageModule {}
