import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError } from 'rxjs';
import { tatuadores } from './Interfaces/tatuadores';
@Injectable({
  providedIn: 'root'
})
export class TatuadoresService {

  private baseUrl = 'http://localhost:3000';
  constructor(private http: HttpClient) { }


   getTatuadores(): Observable<tatuadores[]>{
    const url = 'http://localhost:3000/Tatuadores';
    return this.http.get<tatuadores[]>(url)
  }

  EliminarTatuadores(id:number): Observable<any>{
    const url = 'http://localhost:3000/Tatuador/Eliminar/'+id;
    return this.http.delete(url)
  }

  getEspecialidades(id:number): Observable<string[]>{
    const url = 'http://localhost:3000/Tatuadores/especialidades/'+id;
    return this.http.get<string[]>(url)
  }
}
