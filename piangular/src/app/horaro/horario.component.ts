import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ReservaService } from '../services/reserva/reserva.service';

declare var paypal: any;
@Component({
  selector: 'app-horario',
  templateUrl: './horario.component.html',
  styleUrls: ['./horario.component.css']
})
export class horarioComponent implements OnInit {

  @ViewChild('paypal', { static: true }) paypalElement: ElementRef | undefined;

  constructor(private reservaService:ReservaService,private http:HttpClient){}
  recipientEmail!: string;
  
  sendEmail() {
    // if (!this.recipientEmail) {
    //   console.error('Ingrese un correo destinatario válido.');
    //   return;
    // }

    const data = {
      to: ""
    };

    this.http.post<any>('http://localhost:3000/send-email', data).subscribe(
      (response: any) => {
        console.log(response); // Puedes mostrar un mensaje de éxito al usuario
      },
      (error: any) => {
        console.error(error); // Puedes mostrar un mensaje de error al usuario
      }
    );
  }



  tatuador = 1;

  changeTatuador(id: any,NombreTatuador: string) { 
    this.reservaService.NombreTatuador = NombreTatuador;
    this.tatuador = id;
  }

  producto = {
    description: 'producto en venta',
    precio: 1231,
    img: 'img del prod'
  }

  ngOnInit(): void {
    this.ObtenerCosto();
    paypal.Buttons({
      createOrder: (data: any, actions: any) => {
        return actions.order.create({
          purchase_units: [
            {
              description: this.producto.description,
              amount: {
                currency_code: 'EUR',
                value: this.producto.precio
              }
            }
          ]
        })
      },
      onApprove: async (data: any, actions: any) => {
        const order = await actions.order.capture();
        console.log(order);
      },
      onError: (err: any) => {
        console.log(err);
      }
    })
      .render(this.paypalElement!.nativeElement)
    }
    numeroIngresado: number | null = null;
    numeroMostrado: number | null = null;
  
    enviarNumero() {
      this.numeroMostrado = this.numeroIngresado;
    }

    ObtenerCosto() {
      this.reservaService.getCostoReserva().subscribe((respuesta:any) =>{
        console.log(respuesta.data[0].CostoPago);
        this.reservaService.CostoReserva =respuesta.data[0].CostoPago;
      })
    }

  }

