import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Usuario } from 'src/app/Interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  public logueado:boolean = false;
  public rol:number=0;
  public idUsuario:number=0;

  public UsuariosRegistrados: Usuario[]=[
    {
      IdUsuario:9,
      Nombre:"Sebastián",
      Apellido:"Vera",
      CorreoElectronico:"sebastian.vera1901@alumnos.ubiobio.cl",
      Contrasenia:"admin",
      IdRol:2,
      Edad:23,
      Sexo:"Hombre",
    },
    {
      IdUsuario:8,
      Nombre:"jaime",
      Apellido:"Ayala",
      CorreoElectronico:"jaimeayalac@gmail.com",
      Contrasenia:"jaimea",
      IdRol:3,
      Edad:33,
      Sexo:"Hombre",
    }
  ];



  constructor(private http: HttpClient) { }

  login(email:any,password:any){
    let userLogin = { CorreoElectronico:email, Contrasenia:password };
    
    return this.http.post('http://localhost:3000/login', userLogin)

  }
}
