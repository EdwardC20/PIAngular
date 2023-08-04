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


   getTatuadores(){

  }

  EliminarTatuadores(id:number){

  }

  getEspecialidades(id:number){

  }
}
