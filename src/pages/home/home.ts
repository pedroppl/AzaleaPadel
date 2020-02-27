import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { UsuariosPage } from '../usuarios/usuarios';
import { ReservasPage } from '../reservas/reservas';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController,public navparam: NavParams) {

    // used for an example of ngFor and navigation

    console.log("Estoy en el home");
    
    console.log(this.navparam.get('usuario_logeado'));

    
  }


  abreUsuariosPage(){
    this.navCtrl.setRoot(UsuariosPage);
   
  
  }

  abreReservasPage(){
    this.navCtrl.setRoot(ReservasPage);
   
  
  }

}
