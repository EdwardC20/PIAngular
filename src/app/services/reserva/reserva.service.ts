import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { ListadoReservas } from 'src/app/Interfaces/tatuadores';
import { Costo } from 'src/app/Interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class ReservaService {

  NombreTatuador!:string;
  FechaReserva!:string;




  CostoReserva=12;
  public reservas:any[]=[];
  constructor(private http : HttpClient) { }

  newReserva(reservas:any){
  }

  getReservas(){

  }

  getTodasLasReservas(){

  }

  getCostoReserva(){
  }

  putCostoReserva(costo: number){

  }



}
