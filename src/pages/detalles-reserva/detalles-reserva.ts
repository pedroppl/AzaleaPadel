import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

/**
 * Generated class for the DetallesReservaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-detalles-reserva',
  templateUrl: 'detalles-reserva.html',
})
export class DetallesReservaPage {


  ngElemento:any;
  ngHoras:any;
  mViewController: ViewController;
  ngPista:any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController) {

    this.mViewController = viewCtrl;
    this.ngElemento = navParams.data['datos'];
    this.ngPista = navParams.data['id_pista'];
    this.ngPista += 1;

    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetallesReservaPage');
  }

  cerrarModal(){
    this.mViewController.dismiss();
  }

}
