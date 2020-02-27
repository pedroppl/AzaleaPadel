import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Tabs, Tab } from 'ionic-angular';
import { ReservasJugadorPage } from '../reservas-jugador/reservas-jugador';
import { InformacionJugadorPage } from '../informacion-jugador/informacion-jugador';
import { InformacionReservasJugadorPage } from '../informacion-reservas-jugador/informacion-reservas-jugador';
import { LoginPage } from '../login/login';


/**
 * Generated class for the HomeJugadorPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-home-jugador',
  templateUrl: 'home-jugador.html',
})




export class HomeJugadorPage {

  tab1Root = InformacionJugadorPage;
  tab2Root =  ReservasJugadorPage;
  tab3Root = InformacionReservasJugadorPage;
  tabActual : Tab;

  esPrimertab : boolean;

  @ViewChild('myTabs') tabRef: Tabs;

  constructor(public navCtrl: NavController, public navParams: NavParams) {

   
    
    console.log("Estoy en home jugador");
    
    console.log(this.navParams.get('usuario_logeado'));


  }

  ionViewDidLoad() {
    
    //console.log('ionViewDidLoad HomeJugadorPage');

    
  }
  ionViewWillEnter(){
    
    console.log('RECARGANDO LA PAGINA');

    
    
    
  }

  logOut(){
    
    localStorage.setItem('datos', "");
    this.navCtrl.setRoot(LoginPage);

   
  }




}
