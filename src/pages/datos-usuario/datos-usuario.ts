import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { ViewController } from 'ionic-angular';
import { UsuariosServiceProvider } from '../../providers/usuarios-service/usuarios-service';


/**
 * Generated class for the DatosUsuarioPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-datos-usuario',
  templateUrl: 'datos-usuario.html',
})
export class DatosUsuarioPage {

  ngElemento:any;
  mViewController: ViewController;
  funcionesUsuarios : UsuariosServiceProvider;


  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, public alertCtrl: AlertController, public fnUsuarios: UsuariosServiceProvider) {
    this.mViewController = viewCtrl;
        
     this.ngElemento = navParams.data.datos;

     console.log(this.ngElemento);
     

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



  showPrompt(tipo:any, accion:any) {
    let prompt = this.alertCtrl.create({



      title: "Gestion de bonos",
      message: accion +  ' bonos de ' + tipo,
      inputs: [
        {
          name: 'cantidad',
          placeholder: 'cantidad',
          type: 'number',
          min: '0'
        },
      ],
      buttons: [
        {
          text: 'Cancelar',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Guardar',
          handler: data => {
            console.log(data);

              if(accion == "agregar"){

                if(data.cantidad == ""){
                  data.cantidad = 0;
                }

                if(tipo == "clase"){
                  let bono:number = this.ngElemento.bonos_clase;
                  
                  bono = parseInt(data.cantidad ) + parseInt(this.ngElemento.bonos_clase) ;

                  console.log(bono);
                  this.funcionesUsuarios.fncambiarBonos(this.ngElemento.id_usuario, tipo, bono).subscribe(this.updateBonosOk.bind(this, bono, tipo), this.updateBonosFail.bind(this) );

                }else{
                  let bono:number = this.ngElemento.bonos_partido;
                  
                  bono = parseInt(data.cantidad ) + parseInt(this.ngElemento.bonos_partido) ;

                  console.log(bono);
                  this.funcionesUsuarios.fncambiarBonos(this.ngElemento.id_usuario, tipo, bono).subscribe(this.updateBonosOk.bind(this, bono, tipo), this.updateBonosFail.bind(this) );

                }
              
              }else{
                if(data.cantidad == ""){
                  data.cantidad = 0;
                }
                
                if(tipo == "clase"){
                  let bono:number = this.ngElemento.bonos_clase;
                  
                  bono = parseInt(this.ngElemento.bonos_clase) - parseInt(data.cantidad )   ;

                  console.log(bono);
                  this.funcionesUsuarios.fncambiarBonos(this.ngElemento.id_usuario, tipo, bono).subscribe(this.updateBonosOk.bind(this, bono, tipo), this.updateBonosFail.bind(this) );

                }else{
                  let bono:number = this.ngElemento.bonos_partido;
                  
                  bono = parseInt(this.ngElemento.bonos_partido) - parseInt(data.cantidad )   ;

                  console.log(bono);
                  this.funcionesUsuarios.fncambiarBonos(this.ngElemento.id_usuario, tipo, bono).subscribe(this.updateBonosOk.bind(this, bono, tipo), this.updateBonosFail.bind(this) );

                }
              }
          }
        }
      ]
    });
    prompt.present();
  }


  updateBonosOk(data:any, tipo:any, respuesta:any){

    if(tipo == "clase"){
      this.ngElemento.bonos_clase = data;
    }else{
      this.ngElemento.bonos_partido = data;
    }

  }


  updateBonosFail(){

  }



}





