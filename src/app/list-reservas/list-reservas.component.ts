import { Component } from '@angular/core';
import { ReservaService } from '../services/reserva/reserva.service';
import { ListadoReservas } from '../Interfaces/tatuadores';

@Component({
  selector: 'app-list-reservas',
  templateUrl: './list-reservas.component.html',
  styleUrls: ['./list-reservas.component.css']
})
export class ListReservasComponent {
  numeroIngresado!: number;

  reservas!: ListadoReservas[];
  constructor(private servicioReservas: ReservaService, public reservaService: ReservaService){
    this.obtenerReservas();
    this.numeroIngresado=this.reservaService.CostoReserva;
  }

  obtenerReservas(){


    this.reservas = [
      {
        IdReserva: 1,
        Nombre_Tatuador: "Cristian",
        Apellido_Tatuador: "Donoso",
        Fecha_Reserva: "2023-07-08:09:00:00",
        Nombre_Cliente: "Eduardo",
        Apellido_Cliente: "Contreras",
        Idpago: 4002152,
        Monto: 12,
        FechaPago: "2023-07-07:10:55:24",
      },
      {
        IdReserva: 2,
        Nombre_Tatuador: "Cristian",
        Apellido_Tatuador: "Silva",
        Fecha_Reserva: "2023-07-09:10:00:00",
        Nombre_Cliente: "Carolina",
        Apellido_Cliente: "Escalona",
        Idpago: 4008953,
        Monto: 10,
        FechaPago: "2023-07-08:00:21:24",
      },
      {
        IdReserva: 3,
        Nombre_Tatuador: "Cristian",
        Apellido_Tatuador: "Donoso",
        Fecha_Reserva: "2023-07-12:18:00:00",
        Nombre_Cliente: "Iván",
        Apellido_Cliente: "Llanos",
        Idpago: 4012010,
        Monto: 12,
        FechaPago: "2023-07-11:13:33:22",
      },
      {
        IdReserva: 4,
        Nombre_Tatuador: "Julio",
        Apellido_Tatuador: "Escalona",
        Fecha_Reserva: "2023-07-14:12:00:00",
        Nombre_Cliente: "Samuel",
        Apellido_Cliente: "González",
        Idpago: 4212311,
        Monto: 12,
        FechaPago: "2023-07-25:22:55:24",
      },
      {
        IdReserva: 5,
        Nombre_Tatuador: "Emerson",
        Apellido_Tatuador: "Rojas",
        Fecha_Reserva: "2023-07-25:16:00:00",
        Nombre_Cliente: "Juan",
        Apellido_Cliente: "Hernández",
        Idpago: 4312353,
        Monto: 12,
        FechaPago: "2023-07-20:12:22:01",
      }
    ]
  }


  enviarNumero() {
    if(this.reservaService.CostoReserva != this.numeroIngresado){
      this.reservaService.CostoReserva = this.numeroIngresado;
      this.numeroIngresado=this.numeroIngresado;
    }
  }
}
  
  
