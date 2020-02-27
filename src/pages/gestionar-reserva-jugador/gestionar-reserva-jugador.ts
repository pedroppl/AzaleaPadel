import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { ReservasServiceProvider } from '../../providers/reservas-service/reservas-service';

/**
 * Generated class for the GestionarReservaJugadorPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-gestionar-reserva-jugador',
  templateUrl: 'gestionar-reserva-jugador.html',
})
export class GestionarReservaJugadorPage {

  ngElemento2 : any;

  mViewController: ViewController;
  funcionesReservas : ReservasServiceProvider;

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, public fnReservas : ReservasServiceProvider) {
    this.mViewController = viewCtrl;
    

    this.ngElemento2 = navParams.data;
    this.funcionesReservas=fnReservas;

    

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GestionarReservaJugadorPage');
  }


  cerrarModal(){

    this.mViewController.dismiss({"accion":"cancelar"});
  }



  guardarDatos(){

    this.funcionesReservas.editarReservas(this.ngElemento2.franja.id_reserva, this.ngElemento2.franja.invitados, this.ngElemento2.franja.comentarios).subscribe(this.editarReservaOk.bind(this), this.editaFail.bind(this) );

    
  }
  


  editarReservaOk(data:any){


    // console.log(data[0]);

   let mId = this.ngElemento2.franja.id_reserva;
   let mInvi = this.ngElemento2.franja.invitados;
   let mComent = this.ngElemento2.franja.comentarios;
   let mFranja = this.ngElemento2.franja.franja_inicio;

    
     if(data[0] === "editado_ok"){
       this.viewCtrl.dismiss({"accion":"editar", datos:{mId, mInvi, mComent, mFranja} });
     }
   }
 
   editaFail(data:any){
     console.log(data);
 
     
   }

}
