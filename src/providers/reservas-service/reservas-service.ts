import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';

/*
  Generated class for the ReservasServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ReservasServiceProvider {

  constructor(public http: HttpClient) {
    console.log('Hello ReservasServiceProvider Provider');
  }



  public obtenerReservas(fecha:string): Observable<any> {
    let url = "http://localhost:8888/azalea/reservas/getListaReservasAdmin.php";

    let postParams = {fecha:''}
    postParams.fecha=fecha;

    return this.http.post(url, postParams);
  }
  public obtenerPistas(): Observable<any> {
    let url = "http://localhost:8888/azalea/reservas/getPistas.php";



    return this.http.post(url, null);
  }




  public insertaReserva(id_pista:number, fecha_reserva:any, tramos_reservados:string, franja_inicio: string, invitados:string,
     comentarios:string, id_jugador:string, tipo_reserva:string): Observable<any> {
    let url = "http://localhost:8888/azalea/reservas/agregarReserva.php";





    let postParams = {id_pista:0, fecha_reserva:'', tramos_reservados:'',franja_inicio:'',invitados:'', comentarios:'', id_jugador:'', tipo_reserva:''}
    postParams.id_pista=id_pista;
    postParams.fecha_reserva=fecha_reserva;
    postParams.tramos_reservados=tramos_reservados;
    postParams.franja_inicio=franja_inicio;
    postParams.invitados=invitados;
    postParams.comentarios=comentarios;
    postParams.id_jugador=id_jugador;
    postParams.tipo_reserva=tipo_reserva;
    

   //console.log(postParams);
   

    return this.http.post(url, postParams);
  }


  public eliminarReservas(id_reserva:string, id_pista:string, fecha:string): Observable<any> {
    let url = "http://localhost:8888/azalea/reservas/eliminarReserva.php";

    let postParams = {id_reserva:'', id_pista:'', fecha:''}
   
    postParams.id_reserva=id_reserva;
    postParams.id_pista = id_pista;
    postParams.fecha=fecha;

    return this.http.post(url, postParams);
  }






  public editarReservas(id_reserva:string, invitados:string, comentarios:string): Observable<any> {
    let url = "http://localhost:8888/azalea/reservas/editarReserva.php";

    let postParams = {id_reserva:'', invitados:'', comentarios:''}
    postParams.id_reserva=id_reserva;
    postParams.invitados=invitados;
    postParams.comentarios=comentarios;

    return this.http.post(url, postParams);
  }




  public obtenerReservasJugadpr(id_jugador:string): Observable<any> {
    let url = "http://localhost:8888/azalea/reservas/getReserva.php";

    let postParams = {id_jugador:''}
    postParams.id_jugador=id_jugador;

    return this.http.post(url, postParams);
  }


}
