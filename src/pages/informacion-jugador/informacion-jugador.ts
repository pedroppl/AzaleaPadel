import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, AlertController } from 'ionic-angular';
import { UsuariosServiceProvider } from '../../providers/usuarios-service/usuarios-service';

/**
 * Generated class for the InformacionJugadorPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-informacion-jugador',
  templateUrl: 'informacion-jugador.html',
})
export class InformacionJugadorPage {

  ngElemento:any;
  mViewController: ViewController;
  funcionesUsuarios : UsuariosServiceProvider;


  datosJugador : any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, public alertCtrl: AlertController, public fnUsuarios: UsuariosServiceProvider) {
    this.mViewController = viewCtrl;
        

    this.datosJugador = JSON.parse(localStorage.getItem('datos'));
    console.log("Did data load? : ",this.datosJugador);


    this.ngElemento = this.datosJugador.jugador

    this.funcionesUsuarios = fnUsuarios;
 
 
    //this.mUsuario.obtenerUsuario(this.ngElemento.id_usuario).subscribe(this.conexionOk.bind(this), this.conexionFail.bind(this) );

    

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DatosUsuarioPage');
  }


  conexionOk(data:any){
    console.log(data);
  }

  conexionFail(data:any){
    console.log(data);
  }

  cerrarModal(){
    this.mViewController.dismiss(null);
  }


  showPrompt() {
    let prompt = this.alertCtrl.create({
      title: 'Cambiar contraseña',
      message: "Introduzca una nueva contraseña",
      inputs: [
        {
          name: 'clave',
          placeholder: 'Contraseña',
          type: 'password'
        },
      ],
      buttons: [
        {
          text: 'Cancelar',
          handler: data => {
            

          }
        },
        {
          text: 'Guardar',
          handler: data => {

          
           
            let clave:string = data.clave;

                  
            this.funcionesUsuarios.fncambiarClave(this.ngElemento.id_usuario, clave).subscribe(this.updateClaveOk.bind(this), this.updateClaveFail.bind(this) );



          }
        }
      ]
    });
    prompt.present();
  }


  updateClaveOk(data:any){


    console.log(data);
    

  }


  updateClaveFail(){

  }


}
