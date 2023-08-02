import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../services/login/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  formLogin: FormGroup;

  constructor(private loginService: LoginService, private fb: FormBuilder, private router:Router){
    this.formLogin = this.fb.group({
      email:['', [Validators.required, Validators.email]],
      password:['', [Validators.required]]
    });
  }


  login(){
    console.log(this.formLogin.value.email);
    console.log(this.formLogin.value.password);
    this.loginService.login(this.formLogin.value.email, this.formLogin.value.password).subscribe((res:any)=>{
      console.log(res.data[0].IdUsuario);
      this.loginService.idUsuario = res.data[0].IdUsuario;
      this.loginService.rol = res.data[0].IdRol
      localStorage.setItem('UsuarioLogueado', JSON.stringify(res.data[0]))
      this.router.navigate(['/home']).then(() => {

        location.reload();
      });
    });

  }
}

