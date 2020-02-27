//import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
/*
  Generated class for the LoginServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class LoginServiceProvider {

  constructor(public http: HttpClient) {
    console.log('Hello LoginServiceProvider Provider');
  }




  public getLoginData(user: string, clave:string): Observable<any> {
    let url = "http://localhost:8888/azalea/login.php";





    let postParams = {user:'',clave:''}
    postParams.user=user;
    postParams.clave=clave;
    

   console.log(postParams);
   

    return this.http.post(url, postParams);
  }

}
