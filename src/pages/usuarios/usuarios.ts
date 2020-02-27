import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { UsuariosServiceProvider } from '../../providers/usuarios-service/usuarios-service';
import { DatosUsuarioPage } from '../datos-usuario/datos-usuario';
import { AgregarJugadorPage } from '../agregar-jugador/agregar-jugador';

/**
 * Generated class for the UsuariosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-usuarios',
  templateUrl: 'usuarios.html',
})
export class UsuariosPage {

  listados:string = "1";

  lista_usuarios: any [];
  lista_usuarios_inactivos: any [];
  lista_usuarios_aux: any [];
  lista_usuarios_inactivos_aux: any [];

  funcionesUsuarios : UsuariosServiceProvider;


  constructor(public navCtrl: NavController, public navParams: NavParams, public fnUsuarios: UsuariosServiceProvider, public modalCtrl: ModalController) {


    this.funcionesUsuarios = fnUsuarios;
    this.lista_usuarios = [];
    this.lista_usuarios_inactivos = [];
    this.lista_usuarios_aux = [];
    this.lista_usuarios_inactivos_aux = [];

    this.funcionesUsuarios.getListadoUsuariosData().subscribe(this.conexionOk.bind(this), this.conexionFail.bind(this) );
 
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UsuariosPage');
  }

  conexionOk(data:any){

    console.log(data);

    for(let p = 0; p < data.length; p++){
      if(data[p].estado_cuenta == 1){

        this.lista_usuarios.push(data[p]);
        this.lista_usuarios_aux = this.lista_usuarios;

      }else if(data[p].estado_cuenta == 0 ){

        this.lista_usuarios_inactivos.push(data[p]);
        this.lista_usuarios_inactivos_aux = this.lista_usuarios_inactivos;

      }
    }
  }


  conexionFail(){

    console.log("Error de conexion");
    
  }

  inicializa_lista_activos(){
    this.lista_usuarios = this.lista_usuarios_aux;
  }
  inicializa_lista_inactivos(){
    this.lista_usuarios_inactivos = this.lista_usuarios_inactivos_aux;
  }

  verDetallesFranja(franja){
    let modal = this.modalCtrl.create(DatosUsuarioPage, {'datos':franja});

    modal.present();

  }
  agregarJugador(){
    let modal = this.modalCtrl.create(AgregarJugadorPage);

    modal.present();
  }

  editarFranja(franja, item){
    let modal = this.modalCtrl.create(AgregarJugadorPage, {'datos':franja});

    modal.present();
    item.close();
  }

  desactivarFranja(franja){

    this.funcionesUsuarios.fnDesactivarUsuario(franja.id_usuario).subscribe(this.desactivarOk.bind(this, franja), this.conexionFail.bind(this) );
 
  }

  desactivarOk(data:any, response:any){
    this.lista_usuarios_inactivos.push(data);
    this.lista_usuarios.splice(this.lista_usuarios.indexOf(data), 1);

  }

  activarFranja(franja){

    this.funcionesUsuarios.fnDesactivarUsuario(franja.id_usuario).subscribe(this.activarOk.bind(this, franja), this.conexionFail.bind(this) );
 
  }

  activarOk(data:any, response:any){
    this.lista_usuarios.push(data);
    this.lista_usuarios_inactivos.splice(this.lista_usuarios_inactivos.indexOf(data), 1);

  }


  

  getItems(ev) {
    // Reset items back to all of the items

    

    // set val to the value of the searchbar
    let val = ev.target.value;

    // if the value is an empty string don't filter the items
    if(this.listados === "1"){
      this.inicializa_lista_activos();
      if (val && val.trim() != '') {
        this.lista_usuarios= this.lista_usuarios.filter((item) => {
          return (item.nombre.toLowerCase().indexOf(val.toLowerCase()) > -1);
        });
      }
    }else if(this.listados === "2"){
      this.inicializa_lista_inactivos();
      if (val && val.trim() != '') {
          this.lista_usuarios_inactivos = this.lista_usuarios_inactivos.filter((item) => {
            return (item.nombre.toLowerCase().indexOf(val.toLowerCase()) > -1);
          });
      }
    }
    
  }


}
