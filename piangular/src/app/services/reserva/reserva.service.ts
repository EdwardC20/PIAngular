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

  newReserva(reservas:any):Observable<any>{
    console.log("sillega");
    console.log(reservas);
    return this.http.post('http://localhost:3000/reservas', reservas)
  }

  getReservas():Observable<any>{
    return this.http.get<any[]>('http://localhost:3000/reserva').pipe(map((res:any)=>res.data));
  }

  getTodasLasReservas():Observable<ListadoReservas[]>{
    return this.http.get<ListadoReservas[]>('http://localhost:3000/TodasLasReservas');
  }

  getCostoReserva():Observable<any>{
    return this.http.get<any>('http://localhost:3000/Reservas/Costo');
  }

  putCostoReserva(costo: number): Observable<any>{
    const body = { Tipo_imagen: 1};
    const url = 'http://localhost:3000/Reservas/CambiarCosto/'+costo;
    return this.http.put(url,body)
  }



}
