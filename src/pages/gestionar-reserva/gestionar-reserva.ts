import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { UsuariosServiceProvider } from '../../providers/usuarios-service/usuarios-service';
import { ReservasServiceProvider } from '../../providers/reservas-service/reservas-service';

/**
 * Generated class for the GestionarReservaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-gestionar-reserva',
  templateUrl: 'gestionar-reserva.html',
})
export class GestionarReservaPage {


  ngElemento2:any;

  mViewController: ViewController;

  lista_activos : any [];
  listado_aux_activos: any [];
  lista_usuarios : any []
  funcionesUsuarios : UsuariosServiceProvider;
  funcionesReservas : ReservasServiceProvider;

  mTipo_reserva : any;

  ngTramos :any;
  ngInvitados : any;
  ngComentarios : any;
  ngJugador : any;
  ngFranja_inicio : any;

  ngFecha : any;

  ngNombreDiaSemana : any;
  ngNombreMes : any;

  mIdOriginal:any;
  mInviOriginal:any;
  mComentOriginal:any;
  mFranjaOriginal:any

  prueba: Date;



  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController,
    public fnUsuarios: UsuariosServiceProvider, public fnReservas : ReservasServiceProvider) {

    this.mViewController = viewCtrl;
    console.log(navParams.data);
   
    this.ngElemento2 = navParams.data;

    this.lista_usuarios = [];
    this.lista_activos = [];
    this.listado_aux_activos = this.lista_activos;
    this.funcionesUsuarios = fnUsuarios;
    this.funcionesReservas=fnReservas;

    this.mTipo_reserva = "2";
    this.ngTramos = "1";
    this.ngInvitados = "0";
    

      this.prueba = new Date(this.navParams.get('fecha_actual'));

      this.ngNombreDiaSemana = this.prueba.getDay();
      this.ngNombreMes = this.prueba.getMonth();
      this.ngFecha = this.prueba.getDate();

    this.ngJugador = "1";
    if(this.navParams.data.franja.detalles_reserva.franja_inicio){
      this.ngFranja_inicio = this.navParams.data.franja.detalles_reserva.franja_inicio;
    }

    if(this.ngElemento2.franja.reserva){
      this.mIdOriginal = this.ngElemento2.franja.detalles_reserva.id_reserva;
      this.mInviOriginal = this.ngElemento2.franja.detalles_reserva.invitados;
      this.mComentOriginal = this.ngElemento2.franja.detalles_reserva.comentarios;
      this.mFranjaOriginal = this.ngElemento2.franja.detalles_reserva.franja_inicio;
    }
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad GestionarReservaPage');
    this.cargarListaServer();
    this.mTipo_reserva = "2";
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


  cargarListaServer(){
    this.lista_usuarios = [];
    this.funcionesUsuarios.getListadoUsuariosData().subscribe(this.conexionOk.bind(this), this.conexionFail.bind(this) );
    
  }

  conexionOk(data:any){

   // console.log(data);
    this.lista_usuarios = [];
    if(data[0] == "Error"){

    }else{
      this.lista_usuarios = data;
      let conta = 0;
      this.lista_activos = [];
      
      while(conta < this.lista_usuarios.length){
        
        if(data[conta].estado_cuenta == "1"){

          this.lista_activos.push(data[conta]);
        }

        //console.log(data[conta].estado_cuenta);
        conta++;
      }
      this.listado_aux_activos = this.lista_activos;
    }

  }

  conexionFail(data:any){
    console.log(data);
  }

  inicializa_lista_activos(){
    this.lista_activos = this.listado_aux_activos;
  }

  getItems(ev) {
    // Reset items back to all of the items

    

    // set val to the value of the searchbar
    let val = ev.target.value;

    // if the value is an empty string don't filter the items
    
      this.inicializa_lista_activos();

      if (val && val.trim() != '') {
        this.lista_activos = this.lista_activos.filter((item) => {
          return (item.nombre.toLowerCase().indexOf(val.toLowerCase()) > -1);
        });
      }
   
  }
    

  getTipoReserva(value){

    this.mTipo_reserva= value;
  }

  getIdUsuario(value){

    this.ngJugador = value;

  }


  agregarReserva(){

    console.log("la fecha es " + this.navParams.get('fecha_actual'));
    


    this.funcionesReservas.insertaReserva(this.navParams.get('id_pista'),this.navParams.get('fecha_actual'), 
              this.ngTramos, this.navParams.data.franja.detalles_reserva.franja_inicio, 
              this.ngInvitados, this.ngComentarios, this.ngJugador, this.mTipo_reserva ).subscribe(this.agregaReservaOk.bind(this), this.conexionFail.bind(this) );

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
 

  guardarDatos(){

    this.funcionesReservas.editarReservas(this.ngElemento2.franja.detalles_reserva.id_reserva, this.ngElemento2.franja.detalles_reserva.invitados, this.ngElemento2.franja.detalles_reserva.comentarios).subscribe(this.editarReservaOk.bind(this), this.editaFail.bind(this) );

    
  }
  


  editarReservaOk(data:any){


    // console.log(data[0]);

   let mId = this.ngElemento2.franja.detalles_reserva.id_reserva;
   let mInvi = this.ngElemento2.franja.detalles_reserva.invitados;
   let mComent = this.ngElemento2.franja.detalles_reserva.comentarios;
   let mFranja = this.ngElemento2.franja.detalles_reserva.franja_inicio;

    
     if(data[0] === "editado_ok"){
       this.viewCtrl.dismiss({"accion":"editar", datos:{mId, mInvi, mComent, mFranja} });
     }
   }
 
   editaFail(data:any){
     console.log(data);
 
     
   }


}
