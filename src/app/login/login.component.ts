import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../services/login/login.service';
import { Router } from '@angular/router';
import { Usuario } from '../Interfaces/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  formLogin: FormGroup;
  UsuarioLogin!:Usuario;
  constructor(private loginService: LoginService, private fb: FormBuilder, private router:Router){
    this.formLogin = this.fb.group({
      email:['', [Validators.required, Validators.email]],
      password:['', [Validators.required]]
    });
  }


  login(){
    console.log(this.formLogin.value.email);
    console.log(this.formLogin.value.password);
    for(let i=0; this.loginService.UsuariosRegistrados.length;i++){
      if((this.loginService.UsuariosRegistrados[i].CorreoElectronico==this.formLogin.value.email) && (this.loginService.UsuariosRegistrados[i].Contrasenia ==this.formLogin.value.password)){
        this.loginService.idUsuario = this.loginService.UsuariosRegistrados[i].IdUsuario;
        this.loginService.rol = this.loginService.UsuariosRegistrados[i].IdRol;
        localStorage.setItem('UsuarioLogueado', JSON.stringify(this.loginService.UsuariosRegistrados[i]));
        this.UsuarioLogin=this.loginService.UsuariosRegistrados[i];
        this.router.navigate(['/home']).then(() => {
          location.reload();
        });
      }
    }
  }
}

