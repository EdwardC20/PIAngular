import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatDialogModule } from '@angular/material/dialog';

import { AppComponent } from './app.component';
import { HomePortafolioComponent } from './home-portafolio/home-portafolio.component';
import { CommonModule } from '@angular/common';
import { Routes,RouterModule, ExtraOptions } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegistroComponent } from './registro/registro.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { horarioComponent } from './horaro/horario.component';
import { horario1Component } from './horaro1/horario1.component';
import { horario2Component } from './horaro2/horario2.component';
import { horario3Component } from './horaro3/horario3.component';
import { horario4Component } from './horaro4/horario4.component';
import { FooterComponent } from './footer/footer.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import { ModalgalleryComponent } from './modalgallery/modalgallery.component';
import { PagoComponent } from './pago/pago.component';
import {LOCALE_ID } from '@angular/core';
import { ModalModule } from 'ngx-bootstrap/modal';
import localeEs from '@angular/common/locales/es';
import { registerLocaleData } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { TatuadoresService } from './tatuadores.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { TatuajesdestacadosService } from 'src/tatuajesdestacados.service';
import { PortafolioService } from 'src/portafolio.service';
import { ModalTdestacadosComponent } from './modal-tdestacados/modal-tdestacados.component';

import { NgxDropzoneModule } from 'ngx-dropzone';
import { Cloudinary } from 'cloudinary-core';
import { CloudinaryModule } from '@cloudinary/ng';

import { AngularFireModule} from '@angular/fire/compat';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { environment } from './environments/environment';
import { ListReservasComponent } from './list-reservas/list-reservas.component';


registerLocaleData(localeEs, 'es');
const routes: Routes =[
  {path: 'home',component: HomePortafolioComponent},
  {path: 'login',component: LoginComponent},
  {path: 'register',component: RegistroComponent},
  {path: 'horario',component: horarioComponent},
  {path: 'listReserva',component: ListReservasComponent},
  {
    path: '**',
    pathMatch:'full',
    redirectTo: 'home'
  }


];
const routerOptions: ExtraOptions ={
  scrollPositionRestoration: 'enabled',
  anchorScrolling:'enabled'
};
@NgModule({
  declarations: [
    AppComponent,
    HomePortafolioComponent,
    LoginComponent,
    RegistroComponent,
    horarioComponent,
    horario1Component,
    horario2Component,
    horario3Component,
    horario4Component,
    FooterComponent,
    ModalgalleryComponent,
    ModalTdestacadosComponent,

    PagoComponent,

    ListReservasComponent

  ],
  imports: [
    BrowserModule,
    CommonModule,
    RouterModule.forRoot(routes,routerOptions),
    BrowserAnimationsModule,
    ModalModule.forRoot(),
    FullCalendarModule,
    MatDialogModule,
    ReactiveFormsModule,
    NgxDropzoneModule,
    HttpClientModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireStorageModule
  ],
  providers: [
    {provide: LOCALE_ID, useValue: 'es'},
    HttpClient ,
    TatuadoresService,
    TatuajesdestacadosService,
    PortafolioService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
