import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController, ModalController, AlertController } from 'ionic-angular';
import { ReservasServiceProvider } from '../../providers/reservas-service/reservas-service';
import { GestionarReservaJugadorPage } from '../gestionar-reserva-jugador/gestionar-reserva-jugador';

/**
 * Generated class for the InformacionReservasJugadorPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-informacion-reservas-jugador',
  templateUrl: 'informacion-reservas-jugador.html',
})
export class InformacionReservasJugadorPage {


  lista_reservas : any [];
  funcionesReservas : ReservasServiceProvider;
  datosJugador : any;

  ngNombreDiaSemana : any;
  ngNombreMes : any;
  prueba: Date;
  ngFecha : any;

  ngElemento : any;

  constructor(public navCtrl: NavController, public navParams: NavParams, fnReservas : ReservasServiceProvider, public actionSheetCtrl: ActionSheetController,
  
    public modalCtrl: ModalController, public alertCtrl: AlertController) {

    this.funcionesReservas = fnReservas;

    this.datosJugador = JSON.parse(localStorage.getItem('datos'));
   

    

  }

  ionViewDidLoad() {
    
   // this.cargarListaReservasServer(this.datosJugador.jugador.id_usuario);
  }

  ionViewWillEnter(){
    
    console.log('RECARGANDO LA PAGINA');

    this.cargarListaReservasServer(this.datosJugador.jugador.id_usuario);
  }

  cargarListaReservasServer(id_jugador:string){

    this.funcionesReservas.obtenerReservasJugadpr(id_jugador).subscribe(this.conexionOk.bind(this), this.conexionFail.bind(this) );
  
  }


  conexionOk(data:any){
    
    console.log(data);




    this.lista_reservas = data;

    //console.log("datos de lista");
   // console.log(this.lista_reservas);

    for(let p = 0; p < this.lista_reservas.length; p++){
      this.prueba = new Date(this.lista_reservas[p].fecha_reserva);

      /*
      this.ngNombreDiaSemana = this.prueba.getDay();
      this.ngNombreMes = this.prueba.getMonth();
      this.ngFecha = this.prueba.getDate(); */

      this.lista_reservas[p].ngNombreDiaSemana = this.prueba.getDay();
      this.lista_reservas[p].ngNombreMes = this.prueba.getMonth();
      this.lista_reservas[p].ngFecha = this.prueba.getDate();
    }

    
    
  }


  conexionFail(data:any){
    console.log(data);
    
  }


  
  eliminarReserva(franja){

    let confirm = this.alertCtrl.create({
      title: 'Eliminar esta reserva?',
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

            this.funcionesReservas.eliminarReservas(franja.id_reserva, franja.id_pista, franja.fecha_reserva).subscribe(this.eliminaReservaOk.bind(this, franja), this.eliminaFail.bind(this) );
          } 
        }
      ]
    });
    confirm.present();

    
  }



  eliminaReservaOk(franja:any, respuestaServer:any){

   console.log(respuestaServer);

     if(respuestaServer[0] == "eliminado_ok"){

      console.log();
       
      this.lista_reservas.splice(this.lista_reservas.indexOf(franja), 1);
      

      
     }
     
   }
 
   eliminaFail(data:any){
     console.log(data);
 
     
   }
    
    



  presentActionSheet(ngElemento:any) {
    let actionSheet = this.actionSheetCtrl .create({
      title: 'Gestionar Reserva',
      buttons: [
        {
          text: 'Editar',
          role: 'edit',
          handler: () => {
            console.log('Destructive clicked');

            this.editarReserva(ngElemento, )
          }
        },{
          text: 'Eliminar',
          role: 'edit',
          handler: () => {
            this.eliminarReserva(ngElemento);
          }
        },{
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }


  editarReserva(franja){
    let modal = this.modalCtrl.create(GestionarReservaJugadorPage, {franja, 'fecha_actual':franja.fecha_reserva});

     modal.present();

     modal.onDidDismiss((data:any) => {

       if(data['accion'] == "cancelar"){
         console.log("cancelado");
         
       }

     

       if(data['accion'] == "editar"){
         console.log("editado");
     
        console.log(data.datos );

        franja.comentarios = data['datos'].mComent;
        franja.invitados = data['datos'].mInvi;
        
        

      
       }

      
      
       
      
     });
 }


}
