import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ViewController } from 'ionic-angular';
//import { AgregarUsuarioServiceProvider } from '../../providers/agregar-usuario-service/agregar-usuario-service';
//import { EditarUsuarioServiceProvider } from '../../providers/editar-usuario-service/editar-usuario-service';
import { UsuariosServiceProvider } from '../../providers/usuarios-service/usuarios-service';
import { ToastController } from 'ionic-angular';
/**
 * Generated class for the AgregarJugadorPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-agregar-jugador',
  templateUrl: 'agregar-jugador.html',
})
export class AgregarJugadorPage {

  //mUsuAgregar: AgregarUsuarioServiceProvider;
  //mUsuEditar : EditarUsuarioServiceProvider;
  usuario:any
  titulo:string
  nuevo:boolean
  funcionesUsuarios: UsuariosServiceProvider;




  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    public viewCtrl: ViewController, 
    public fnUsuarios: UsuariosServiceProvider,
    public toastCtrl: ToastController
    //editar_usu_provider : EditarUsuarioServiceProvider, 
    //agregar_usu_provider: AgregarUsuarioServiceProvider
    ) {

      this.funcionesUsuarios = fnUsuarios;

   // this.mUsuAgregar = agregar_usu_provider
    //this.mUsuEditar = editar_usu_provider;
    console.log(navParams.data)

  
    if(navParams.data.datos == undefined){
      this.titulo= "Nuevo usuario"
      this.nuevo=true
      
      //Si el nombre nos da undefined, siginifica que no se ha pasado al usuario.
      // Para evitar que lance error, creamos el objeto usuario y le añadimos campos vacios
      this.usuario = {
        nombre:'',
        telefono:'',
        email:'',
        categoria:''
      };

    }else{
      this.titulo="Editar usario"
      this.nuevo=false
      this.usuario = this.navParams.data.datos;
    }
    

    console.log(this.usuario)

  }

  
  ionViewDidLoad() {
    console.log('ionViewDidLoad AgregarJugadorPage');
  }


  closeModal(){
    this.viewCtrl.dismiss();
  }


  agregarUsu(){

    if(this.usuario.nombre == "" || this.usuario.telefono == "" || this.usuario.email == "" || this.usuario.categoria == ""){

      let toast = this.toastCtrl.create({
        message: 'No se permiten campos vacios',
        duration: 3000
      });
      toast.present();

    }else{
      this.funcionesUsuarios.insertaUsuario(this.usuario.nombre, this.usuario.telefono, this.usuario.email, this.usuario.categoria).subscribe(this.insertaOk.bind(this), this.insertaFail.bind(this))

     
    }


  }

  insertaOk(data:any){


   // console.log(data[0]);
   console.log("insertado", data);
    if(data[0] === "insert_ok"){

      this.usuario.usuario = data[1];
      
      let toast = this.toastCtrl.create({
        message: 'Usuario agregado con éxito',
        duration: 3000
      });
      toast.present();

      this.viewCtrl.dismiss(this.usuario);
    }
  }

  insertaFail(data:any){
    console.log(data);

    
  }


  editarUsu(){
    this.funcionesUsuarios.fnEditarUsuario(this.usuario.id_usuario, this.usuario.nombre, this.usuario.telefono, this.usuario.email, this.usuario.categoria).subscribe(this.editarok.bind(this), this.editarFail.bind(this))
  }

  editarok(data:any){
    console.log(data);
    this.viewCtrl.dismiss(this.usuario);

  }
  editarFail(data:any){

  }


}
