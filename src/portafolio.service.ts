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


  getPortafolioByIdTatuador(id:number): Observable<TatusPortafolio[]>{
    const url = 'http://localhost:3000/PortafolioTataudor/'+id;
    return this.http.get<TatusPortafolio[]>(url)
  }

  EliminarTatuajeDePortafolioByTatuaje(id:number): Observable<any>{
    const url = 'http://localhost:3000/portafolio/Tatuaje/'+id;
    return this.http.delete(url)
  }


  AgregarTatuajePortafolio(tatoo :AgregarTatu){
    console.log("es");
    console.log(tatoo);
    return this.http.post('http://localhost:3000/portafolio/Tatuaje', tatoo);
  }

  uploadImage(vals:any):Observable<any>{
    let data = vals;
    return this.http.post("https://api.cloudinary.com/v1_1/dthoglisj/image/upload", data);
  }



}
