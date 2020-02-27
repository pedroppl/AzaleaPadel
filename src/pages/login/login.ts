import { Component } from '@angular/core';
import { IonicPage, NavController, ModalController } from 'ionic-angular';
import { LoginServiceProvider } from '../../providers/login-service/login-service';
import { ViewController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { HomePage } from '../home/home';
import { HomeJugadorPage } from '../home-jugador/home-jugador';
import { AgregarJugadorPage } from '../agregar-jugador/agregar-jugador';
/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  mlogin: LoginServiceProvider;
  mViewController: ViewController;

  ngUsu:string;
  ngClave:string;

  constructor(public navCtrl: NavController, login : LoginServiceProvider, public viewCtrl: ViewController, public http: HttpClient, public modalCtrl: ModalController) {

    this.mlogin = login;
    
  }


  login(){

    let user =this.ngUsu;
    let clave = this.ngClave;


    this.mlogin.getLoginData(user, clave).subscribe(this.loginOk.bind(this), this.loginFail.bind(this) );

  }

  loginOk(data:any){
    //console.log("Funciona!");

    console.log(data);

    if(data[0]=="OK"){

      if(data[1].tipo_usuario == "admin"){

        let jugador = {"jugador": data[1]};
        localStorage.setItem('datos',JSON.stringify(jugador));


        this.navCtrl.setRoot(HomePage); //Cambiamos el root a la pagina con el menu y le pasamos los datos del usuario
      
      }else{

        let jugador = {"jugador": data[1]};
        localStorage.setItem('datos',JSON.stringify(jugador));


        this.navCtrl.setRoot(HomeJugadorPage); //Cambiamos el root a la pagina con el menu y le pasamos los datos del usuario
      
      }

      
    }
    
  }

  loginFail(){
    console.log("Login ha fallado");
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }



  crearUsuario() {
    let modal = this.modalCtrl.create(AgregarJugadorPage);
    modal.onDidDismiss((data:any) => {
      
      if(data != undefined){ 
        
      }
  });
    modal.present();
    
  }

}
