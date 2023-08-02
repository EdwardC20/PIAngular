import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TatuajesDestacados, TatusPortafolio } from './app/Interfaces/tatuadores';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class TatuajesdestacadosService {
  constructor(private http: HttpClient) { }

  getTatuajesDestacados(): Observable<TatuajesDestacados[]>{
    const url = 'http://localhost:3000/TatuajesDestacados';
    return this.http.get<TatuajesDestacados[]>(url)
  }

  EliminarTatuajesDestacado(id: number){
    const body = { Tipo_imagen: 1};
    const url = 'http://localhost:3000/Tatuajes/DestacadosEliminar/'+id;
    return this.http.put(url,body)
  }

  getTatuajesNoDestacados():Observable<TatusPortafolio[]>{
    const url = 'http://localhost:3000/Tatuajes/NoDestacados';
    return this.http.get<TatusPortafolio[]>(url)
  }

  AgregarTatuajesDestacado(id: number): Observable<any>{
    const body = { Tipo_imagen: 1};
    const url = 'http://localhost:3000/Tatuajes/DestacadosAgregar/'+id;
    return this.http.put(url,body)
  }

  EditarTatuajesDestacado(id: number, nombre:string,Descripcion:string): Observable<any>{
    const body = { nombre: nombre,Descripcion: Descripcion};
    const url = 'http://localhost:3000/Tatuajes/DestacadosEditar/'+id;
    return this.http.put(url,body)
  }
}




