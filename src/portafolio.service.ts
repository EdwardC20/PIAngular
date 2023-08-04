import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AgregarTatu, TatusPortafolio } from './app/Interfaces/tatuadores';
import { ObserversModule } from '@angular/cdk/observers';
import { Observable } from 'rxjs/internal/Observable';
@Injectable({
  providedIn: 'root'
})
export class PortafolioService {

  constructor(private http: HttpClient) { }


  getPortafolioByIdTatuador(id:number){
  }

  EliminarTatuajeDePortafolioByTatuaje(id:number){
  }


  AgregarTatuajePortafolio(tatoo :AgregarTatu){
  }

  uploadImage(vals:any){

  }



}
