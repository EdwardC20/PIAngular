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
  constructor(private servicioReservas: ReservaService,
    public reservaService: ReservaService){
    this.obtenerReservas();
    console.log(this.reservas);
    this.numeroIngresado=this.reservaService.CostoReserva;
  }

  obtenerReservas(){
    this.servicioReservas.getTodasLasReservas().subscribe((response: any)=>{
      this.reservas = response.data;
      console.log(this.reservas);
    })
  }


  enviarNumero() {
    if(this.reservaService.CostoReserva != this.numeroIngresado){
      this.reservaService.CostoReserva = this.numeroIngresado;

      this.reservaService.putCostoReserva(this.numeroIngresado)
      .subscribe((respuesta: any) =>{
        console.log(respuesta);
      })
    }

  }
}
  
  
