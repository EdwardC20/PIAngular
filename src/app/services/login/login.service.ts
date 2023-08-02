import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  public logueado:boolean = false;
  public rol:number=0;
  public idUsuario:number=0;
  constructor(private http: HttpClient) { }

  login(email:any,password:any){
    let userLogin = { CorreoElectronico:email, Contrasenia:password };
    
    return this.http.post('http://localhost:3000/login', userLogin)

  }
}
