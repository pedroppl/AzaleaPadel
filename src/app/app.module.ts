import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';


import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LoginServiceProvider } from '../providers/login-service/login-service';


import { HttpClientModule } from '@angular/common/http'; import { HttpModule } from '@angular/http';
import { LoginPage } from '../pages/login/login';
import { AgregarJugadorPage } from '../pages/agregar-jugador/agregar-jugador';
import { UsuariosPage } from '../pages/usuarios/usuarios';

import { DatosUsuarioPage } from '../pages/datos-usuario/datos-usuario';

import { UsuariosServiceProvider } from '../providers/usuarios-service/usuarios-service';
import { ReservasPage } from '../pages/reservas/reservas';
import { ReservasServiceProvider } from '../providers/reservas-service/reservas-service';


import { CalendarModule } from "ion2-calendar";
import {AutosizeModule} from 'ngx-autosize';

import { HorasPipe } from '../pipes/horas/horas';
import { DetallesReservaPage } from '../pages/detalles-reserva/detalles-reserva';
import { GestionarReservaPage } from '../pages/gestionar-reserva/gestionar-reserva';
import { TramosPipe } from '../pipes/tramos/tramos';
import { HomeJugadorPage } from '../pages/home-jugador/home-jugador';
import { ReservasJugadorPage } from '../pages/reservas-jugador/reservas-jugador';
import { InformacionJugadorPage } from '../pages/informacion-jugador/informacion-jugador';
import { InformacionReservasJugadorPage } from '../pages/informacion-reservas-jugador/informacion-reservas-jugador';
import { AgregarReservaJugadorPage } from '../pages/agregar-reserva-jugador/agregar-reserva-jugador';
import { GestionarReservaJugadorPage } from '../pages/gestionar-reserva-jugador/gestionar-reserva-jugador';
import { DiasSemanaPipe } from '../pipes/dias-semana/dias-semana';
import { NombresMesesPipe } from '../pipes/nombres-meses/nombres-meses';
import { LogoutPage } from '../pages/logout/logout';


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    AgregarJugadorPage,
    LoginPage,
    UsuariosPage,
    DatosUsuarioPage,
    ReservasPage,
    HorasPipe,
    TramosPipe,
    DiasSemanaPipe,
    NombresMesesPipe,
    DetallesReservaPage,
    GestionarReservaPage,
    HomeJugadorPage,
    ReservasJugadorPage,
    InformacionJugadorPage,
    InformacionReservasJugadorPage,
    DetallesReservaPage,
    AgregarReservaJugadorPage,
    GestionarReservaJugadorPage,
    LogoutPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule,
    HttpModule,
    CalendarModule,
    AutosizeModule
    
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    AgregarJugadorPage,
    LoginPage,
    UsuariosPage,
    DatosUsuarioPage,
    ReservasPage,
    DetallesReservaPage,
    GestionarReservaPage,
    HomeJugadorPage,
    ReservasJugadorPage,
    InformacionJugadorPage,
    DetallesReservaPage,
    InformacionReservasJugadorPage,
    AgregarReservaJugadorPage,
    GestionarReservaJugadorPage,
    LogoutPage
    
    
    
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    LoginServiceProvider,
    UsuariosServiceProvider,
    ReservasServiceProvider
  ]
})
export class AppModule {}
