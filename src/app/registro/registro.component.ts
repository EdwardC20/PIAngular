import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { IUser } from 'src/app/Interfaces/user'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegisterService } from '../services/register/register.service';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

declare var paypal: any;
@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit{


  @ViewChild('paypal', {static: true}) paypalElement : ElementRef | undefined;

  producto = {
    description : 'producto en venta',
    precio : 1231,
    img : 'img del prod'
  }


  ngOnInit(): void {
    paypal.Buttons({
      createOrder: (data: any, actions: any)=>{
        return actions.order.create({
          purchase_units:[
            {
              description: this.producto.description,
              amount: {
                currency_code:'EUR',
                value: this.producto.precio
              }
            }
          ]
        })
      },
      onApprove: async(data: any,actions: any) =>{
        const order = await actions.order.capture();
        console.log(order);
      },
      onError: (err: any) =>{
        console.log(err);
      }
    })
    .render(this.paypalElement!.nativeElement)
  }

  formRegister : FormGroup;

  constructor(private registerService: RegisterService ,private fb: FormBuilder){
    this.formRegister = this.fb.group({
      name:['',Validators.required],
      lastName:['',Validators.required],
      email:['',Validators.required],
      password:['',Validators.required],
      edad:['',Validators.required],
      sexo:['',Validators.required],
      idRol:['1',Validators.required]
    });
  }

  registrar(){

    let datos: IUser ={
      Nombre: this.formRegister.value.name,
      Apellido: this.formRegister.value.lastName,
      CorreoElectronico: this.formRegister.value.email,
      Contrasenia: this.formRegister.value.password,
      Edad: this.formRegister.value.edad,
      Sexo: this.formRegister.value.sexo,
    }
    this.guardarUsuario(datos);

  }

  guardarUsuario(usuario:IUser) {

    this.registerService.register(usuario, 1).subscribe(  (response) => {
      console.log(response);
    },
    (error: HttpErrorResponse) => {
      // Si ocurre un error, aquí puedes obtener el código de error de la consulta POST.
      console.error('Código de error:', error.status);
      console.error('Mensaje de error:', error.message);
    });
  }
}
