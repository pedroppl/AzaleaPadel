import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { ReservasServiceProvider } from '../../providers/reservas-service/reservas-service';

/**
 * Generated class for the AgregarReservaJugadorPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-agregar-reserva-jugador',
  templateUrl: 'agregar-reserva-jugador.html',
})
export class AgregarReservaJugadorPage {


  mViewController: ViewController;


  ngElemento2:any;

  funcionesReservas : ReservasServiceProvider

  mTipo_reserva : any;

  ngTramos :any;
  ngInvitados : any;
  ngComentarios : any;

  ngFranja_inicio : any;

  ngFecha : any;


  mIdOriginal:any;
  mInviOriginal:any;
  mComentOriginal:any;
  mFranjaOriginal:any

  datosJugador : any;




  ngNombreDiaSemana : any;
  ngNombreMes : any;
  prueba: Date;

  constructor(public navCtrl: NavController, public navParams: NavParams, public fnReservas : ReservasServiceProvider,public viewCtrl: ViewController) {


    this.mViewController = viewCtrl;

    this.ngElemento2 = navParams.data;

    

    
    this.funcionesReservas=fnReservas;

    this.mTipo_reserva = "2";
    this.ngTramos = "1";
    this.ngInvitados = "0";
    this.ngFecha = this.navParams.get('fecha_actual');
    this.ngComentarios = "";
    if(this.navParams.data.franja.detalles_reserva.franja_inicio){
      this.ngFranja_inicio = this.navParams.data.franja.detalles_reserva.franja_inicio;
    }
    this.mIdOriginal = this.ngElemento2.franja.detalles_reserva.id_reserva;
      this.mInviOriginal = this.ngElemento2.franja.detalles_reserva.invitados;
      this.mComentOriginal = this.ngElemento2.franja.detalles_reserva.comentarios;
      this.mFranjaOriginal = this.ngElemento2.franja.detalles_reserva.franja_inicio;
      this.datosJugador = JSON.parse(localStorage.getItem('datos'));

      this.prueba = new Date(this.navParams.get('fecha_actual'));

      this.ngNombreDiaSemana = this.prueba.getDay();
      this.ngNombreMes = this.prueba.getMonth();
      this.ngFecha = this.prueba.getDate();

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AgregarReservaJugadorPage');

    
    console.log("los datos del jugador",this.datosJugador);

  }


  cerrarModal(){

    if(this.ngElemento2.franja.reserva){
      this.ngElemento2.franja.detalles_reserva.id_reserva = this.mIdOriginal;
      this.ngElemento2.franja.detalles_reserva.invitados = this.mInviOriginal;
      this.ngElemento2.franja.detalles_reserva.comentarios = this.mComentOriginal;
      this.ngElemento2.franja.detalles_reserva.franja_inicio = this.mFranjaOriginal;
    }
   

    this.mViewController.dismiss({"accion":"cancelar"});
  }


  

  agregarReserva(){
    
    this.funcionesReservas.insertaReserva(this.navParams.get('id_pista'),this.navParams.get('fecha_actual'), 
      this.ngTramos, this.navParams.data.franja.detalles_reserva.franja_inicio, 
      this.ngInvitados, this.ngComentarios,this.datosJugador.jugador.id_usuario, this.mTipo_reserva ).subscribe(this.agregaReservaOk.bind(this), this.insertaFail.bind(this) );

  }


  agregaReservaOk(data:any){


    // console.log(data[0]);
    console.log("insertado", data);
     if(data[0] === "insert_ok"){
       this.viewCtrl.dismiss({"accion":"agregar"});
     }
   }
 
   insertaFail(data:any){
     console.log(data);
 
     
   }





  getTipoReserva(value){

    this.mTipo_reserva= value;
  }

}
