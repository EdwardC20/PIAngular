import { Component, ElementRef, OnInit, Output, ViewChild, EventEmitter } from '@angular/core';
import { ReservaService } from '../services/reserva/reserva.service';
import { HttpClient } from '@angular/common/http';

declare var paypal: any;
@Component({
  selector: 'app-pago',
  templateUrl: './pago.component.html',
  styleUrls: ['./pago.component.css']
})
export class PagoComponent implements OnInit{
  local = JSON.parse(localStorage.getItem('UsuarioLogueado')!);



  idPago!:string;

  constructor(public reservaService: ReservaService, private http:HttpClient){}

  @ViewChild('paypal', {static: true}) paypalElement : ElementRef | undefined;
  @Output() emisor = new EventEmitter();
  
  producto = {
    description : 'Reserva de consulta de tatuajes',
    precio : this.reservaService.CostoReserva,
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
        const order = await actions.order.capture()
        let arreglo =[order.status, order.id];
        this.idPago=order.id;
        this.sendDataToParent(arreglo);
      },
      onError: (err: any) =>{
        console.log(err);
      }
    })
    .render(this.paypalElement!.nativeElement)
  }

  sendDataToParent(data:any){
    this.sendEmail()
    this.emisor.emit(data);

  }

  recipientEmail!: string;
  
  sendEmail() {
    // if (!this.recipientEmail) {
    //   console.error('Ingrese un correo destinatario válido.');
    //   return;
    // }

    const data = {
      to: this.local.CorreoElectronico,
      Npersona: this.local.Nombre,
      Apersona: this.local.Apellido,
      costo:  this.reservaService.CostoReserva,
      idpago: this.idPago,
      tatuador:this.reservaService.NombreTatuador,
      fecha:this.reservaService.FechaReserva
    };
    console.log(data);

    this.http.post<any>('http://localhost:3000/send-email', data).subscribe(
      (response: any) => {
        console.log(response); // Puedes mostrar un mensaje de éxito al usuario
      },
      (error: any) => {
        console.error(error); // Puedes mostrar un mensaje de error al usuario
      }
    );
  }

}
