import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TatuajesDestacados, TatusPortafolio } from './app/Interfaces/tatuadores';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class TatuajesdestacadosService {
  constructor(private http: HttpClient) { }

  getTatuajesDestacados(){

  }

  EliminarTatuajesDestacado(id: number){

  }

  getTatuajesNoDestacados(){

  }

  AgregarTatuajesDestacado(id: number){

  }

  EditarTatuajesDestacado(id: number, nombre:string,Descripcion:string){

  }
}




