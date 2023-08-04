import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { IUser, Usuario } from 'src/app/Interfaces/user'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegisterService } from '../services/register/register.service';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { LoginService } from '../services/login/login.service';
import { Router } from '@angular/router';

declare var paypal: any;
@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent{

  formRegister : FormGroup;

  constructor(private router:Router,private loginService: LoginService,private registerService: RegisterService ,private fb: FormBuilder){
    this.formRegister = this.fb.group({
      name:['',Validators.required],
      lastName:['',Validators.required],
      email:['',Validators.required],
      password:['',Validators.required],
      edad:['',Validators.required],
      sexo:['',Validators.required],
      idRol:['',Validators.required]
    });
  }

  registrar(){
    let datos:Usuario ={
      IdUsuario:90,
      Nombre:this.formRegister.value.name,
      Apellido: this.formRegister.value.lastName,
      CorreoElectronico:this.formRegister.value.email,
      Contrasenia: this.formRegister.value.password,
      IdRol:1,
      Edad: this.formRegister.value.edad,
      Sexo: this.formRegister.value.sexo,
    }
    this.loginService.UsuariosRegistrados.push(datos);
    this.loginService.idUsuario = datos.IdUsuario;
    this.loginService.rol = datos.IdRol;
    localStorage.setItem('UsuarioLogueado', JSON.stringify(datos));
    this.router.navigate(['/home']).then(() => {
      location.reload();
    });
  }

}
