import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
/*
  Generated class for the UsuariosServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UsuariosServiceProvider {

  constructor(public http: HttpClient) {
    console.log('Hello UsuariosServiceProvider Provider');
  }
  public insertaUsuario(nombre:string, telefono:string, email: string, categoria:string): Observable<any> {
    let url = "http://localhost:8888/azalea/registro_usuario.php";

    let postParams = {usuario:'', nombre:'',telefono:'',email:'', categoria:''}
    postParams.usuario='usuario';
    postParams.nombre=nombre;
    postParams.telefono=telefono;
    postParams.email=email;
    postParams.categoria=categoria;

    return this.http.post(url, postParams);
  }

  public fnDesactivarUsuario(id_usuario:string): Observable<any> {
    let url = "http://localhost:8888/azalea/desactivarUsuario.php";

    let postParams = {id_usuario:''}
    postParams.id_usuario=id_usuario;

    return this.http.post(url, postParams);
  }

  public fnActivarUsuario(id_usuario:string): Observable<any> {
    let url = "http://localhost:8888/azalea/activarUsuario.php";

    let postParams = {id_usuario:''}
    postParams.id_usuario=id_usuario;

    return this.http.post(url, postParams);
  }

  public fnEditarUsuario(id_usuario:string, nombre:string, telefono:string, email:string, categoria:string): Observable<any> {
    let url = "http://localhost:8888/azalea/editarUsuario.php";

    let postParams = {id_usuario:'', nombre:'', telefono:'', email:'', categoria:''}
    postParams.id_usuario=id_usuario;
    postParams.nombre=nombre;
    postParams.telefono=telefono;
    postParams.email=email;
    postParams.categoria=categoria;

    return this.http.post(url, postParams);
  }

  public obtenerUsuario(id_usuario:string): Observable<any> {
    let url = "http://localhost:8888/azalea/getUsuario.php";

    let postParams = {id_usuario:''}
    postParams.id_usuario=id_usuario;

    return this.http.post(url, postParams);
  }

  public getListadoUsuariosData(): Observable<any> {

    let url = "http://localhost:8888/azalea/listadoUsuarios.php";

    return this.http.get(url);
 
  
}


public fncambiarBonos(id_usuario:string, tipo:any, cantidad:number): Observable<any> {
  
  if(tipo == "clase"){

    let url = "http://localhost:8888/azalea/reservas/editarBonos_Clase.php";

    let postParams = {cantidad:0, id_usuario:''}
    postParams.cantidad=cantidad;
    postParams.id_usuario=id_usuario;
  
    return this.http.post(url, postParams);
  }else{

    let url = "http://localhost:8888/azalea/reservas/editarBonos_Partido.php";


    let postParams = {cantidad:0, id_usuario:''}
    postParams.cantidad=cantidad;
    postParams.id_usuario=id_usuario;
  
    return this.http.post(url, postParams);
  }


 
 

 
}
public fncambiarClave(id_usuario:string, clave:string): Observable<any> {
  let url = "http://localhost:8888/azalea/reservas/editarClave.php";

  let postParams = {id_usuario:'', clave:''}
  postParams.id_usuario=id_usuario;
  postParams.clave=clave;

  return this.http.post(url, postParams);
}


}
