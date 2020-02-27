import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController , ViewController, Slides} from 'ionic-angular';
import { ReservasServiceProvider } from '../../providers/reservas-service/reservas-service';

import { ModalController } from 'ionic-angular';
import { CalendarModal, CalendarModalOptions, CalendarResult } from "ion2-calendar";
import { DetallesReservaPage } from '../detalles-reserva/detalles-reserva';
import { GestionarReservaPage } from '../gestionar-reserva/gestionar-reserva';




/**
 * Generated class for the ReservasPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-reservas',
  templateUrl: 'reservas.html',
})
export class ReservasPage {
  @ViewChild(Slides) slides: Slides;

lista_reservas: any [];
lista_pistas: any [];

lista_nombre_pistas: any [];

nombre_pista_actual : any;

numero_pista_actual : any;

usuario_logeado : any;

dia_seleccionado: any;

ngFecha : any;

ngNombreDiaSemana : any;
ngNombreMes : any;
prueba: Date;

funcionesReservas : ReservasServiceProvider;


  constructor(public navCtrl: NavController, public navParams: NavParams,
     fnReservas : ReservasServiceProvider, public modalCtrl: ModalController, public alertCtrl: AlertController, public viewCtrl: ViewController) {

      

    this.funcionesReservas = fnReservas;

    this.dia_seleccionado = this.fecha_actual();

    this.usuario_logeado = navParams.data.usuario_logeado;

    this.lista_reservas = [];
    this.lista_pistas = [];
      this.lista_nombre_pistas = [];
  // this.slides = slide;

  this.prueba = new Date(this.dia_seleccionado);

      this.ngNombreDiaSemana = this.prueba.getDay();
      this.ngNombreMes = this.prueba.getMonth();
      this.ngFecha = this.prueba.getDate();

  

    
    this.cargarListaReservasServer(this.dia_seleccionado);
    
    
   
  }

   fecha_actual() {
    var d = new Date(),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
}

  ionViewDidLoad() {
    console.log('ionViewDidLoad ReservasPage');
    //this.slides.lockSwipes(true);

    this.slides.effect = "slide";
    
    
  }

  pistaSiguiente(){

      this.slides.slideNext();
      this.numero_pista_actual = this.slides.getActiveIndex();
      this.nombre_pista_actual = this.lista_nombre_pistas[this.slides.getActiveIndex()].nombre_pista;

  }

  pistaAnterior(){

      this.slides.slidePrev();
      this.numero_pista_actual = this.slides.getActiveIndex();
      this.nombre_pista_actual = this.lista_nombre_pistas[this.slides.getActiveIndex()].nombre_pista;

  }


  cargarListaReservasServer(fecha:string){


    if(this.lista_reservas.length > 0){


      this.lista_reservas.splice(0,this.lista_reservas.length)

    }
   // this.lista_reservas.length = 0;
    this.funcionesReservas.obtenerReservas(fecha).subscribe(this.conexionOk.bind(this), this.conexionFail.bind(this) );
    
  }

  

  conexionOk(data:any){
    //console.log("datos del server");
    //console.log(data[0]);
    this.lista_pistas = [];

    for(let numpista = 1; numpista <= 3; numpista++){

      this.lista_reservas = [];

      for(let p = 1; p <= 22; p++){
        this.lista_reservas.push(data[numpista].datos[p]);
      }
      this.lista_pistas.push(this.lista_reservas);
      this.lista_reservas =  [];
         
    }

    console.log(this.lista_pistas);
    this.funcionesReservas.obtenerPistas().subscribe(this.conexionPistasOk.bind(this), this.conexionFail.bind(this) );



  }

  conexionPistasOk(data:any){

    


    this.lista_nombre_pistas = data;
    this.nombre_pista_actual = this.lista_nombre_pistas[0].nombre_pista;
    this.numero_pista_actual = 0;


  }

  conexionFail(data:any){
    console.log(data);
  }


  openCalendar() {
    const options: CalendarModalOptions = {
      title: 'Calendario',
      canBackwardsSelected: true //Nos permite seleccionar dias ya pasados.
    };
    let myCalendar =  this.modalCtrl.create(CalendarModal, {
      options: options
    });

    myCalendar.present();

    myCalendar.onDidDismiss((date: CalendarResult, type: string) => {
      //console.log(date.string);

      if(date != null){

        this.dia_seleccionado = date.string;
        this.cargarListaReservasServer(date.string);

        this.prueba = new Date(this.dia_seleccionado);

      this.ngNombreDiaSemana = this.prueba.getDay();
      this.ngNombreMes = this.prueba.getMonth();
      this.ngFecha = this.prueba.getDate();

      }
      
     
    })
  }


  verDetallesReserva(franja:any){

    let modal = this.modalCtrl.create(DetallesReservaPage, {'datos':franja, 'id_pista':this.numero_pista_actual});

    modal.present();

  }


  reservar(franja:any){

    if(franja.disponibilidad != 0){


      let modal = this.modalCtrl.create(GestionarReservaPage, {franja, 'fecha_actual':this.dia_seleccionado, "id_pista": (this.slides.getActiveIndex() +1) });

      
      modal.present();

      modal.onDidDismiss((data:any) => {
        //console.log(date.string);

        if(data['accion'] == "cancelar"){
          console.log("cancelado");
          
        }

        if(data['accion'] == "agregar"){
          console.log("agregado");
          this.cargarListaReservasServer(this.dia_seleccionado);
          
        }

      });
  
    }

  }

  editarReserva(franja, item){
     let modal = this.modalCtrl.create(GestionarReservaPage, {franja, 'fecha_actual':this.dia_seleccionado});

      modal.present();

      modal.onDidDismiss((data:any) => {

        if(data['accion'] == "cancelar"){
          console.log("cancelado");
          
        }

      

        if(data['accion'] == "editar"){
          console.log("editado");
      
         console.log(data.datos );

         franja.detalles_reserva.comentarios = data['datos'].mComent;
         franja.detalles_reserva.invitados = data['datos'].mInvi;
         
         

       
        }

        item.close();
       
        
       
      });
  }

  eliminarReserva(franja, item){

    let confirm = this.alertCtrl.create({
      title: 'Eliminar esta franja?',
      buttons: [
        {
          text: 'Cancelar',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: 'Aceptar',
          handler: () => {

            this.funcionesReservas.eliminarReservas(franja.detalles_reserva.id_reserva, this.numero_pista_actual, this.dia_seleccionado).subscribe(this.eliminaReservaOk.bind(this), this.eliminaFail.bind(this) );
          } 
        }
      ]
    });
    confirm.present();

    confirm.onDidDismiss(() => {
        item.close()
    });
  }



  eliminaReservaOk(respuestaServer:any){

   console.log(respuestaServer);

     if(respuestaServer[0] == "eliminado_ok"){

      console.log();

      this.lista_pistas[this.numero_pista_actual] = [];

      for(let p = 1; p <= 22; p++){
        this.lista_pistas[this.numero_pista_actual].push(respuestaServer[1]['datos'][p]);
      }
      

     }
     
   }
 
   eliminaFail(data:any){
     console.log(data);
 
     
   }

}
