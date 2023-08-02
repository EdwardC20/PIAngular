import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ModalgalleryComponent } from '../modalgallery/modalgallery.component';
import { TatuadoresService } from '../tatuadores.service';
import { TatuajesDestacados, TatusPortafolio, tatuadores } from '../Interfaces/tatuadores';
import { TatuajesdestacadosService } from 'src/tatuajesdestacados.service';
import { PortafolioService } from 'src/portafolio.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ModalTdestacadosComponent } from '../modal-tdestacados/modal-tdestacados.component';
import { LoginService } from '../services/login/login.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ReservaService } from '../services/reserva/reserva.service';
import { RegisterService } from '../services/register/register.service';
import { Costo, IUser, Itatuador } from '../Interfaces/user';
import { HttpErrorResponse } from '@angular/common/http';
import { AngularFireStorage } from '@angular/fire/compat/storage';


@Component({
  selector: 'app-home-portafolio',
  templateUrl: './home-portafolio.component.html',
  styleUrls: ['./home-portafolio.component.css']
})
export class HomePortafolioComponent {
  local = JSON.parse(localStorage.getItem('UsuarioLogueado')!);
  sas!: Costo;
  tatuadores!: tatuadores[];
  tatuajesDestacados!: TatuajesDestacados[];
  resgistroTat: FormGroup;
  especialidades!: string[];

  tatusPortafolio!: TatusPortafolio[];
  tatuajesnoDestacados!: TatusPortafolio[];
  config = {
    animated: true,
  };
  modalRef?: BsModalRef;
  @ViewChild('template') template!: string;
  constructor(private fireStorage:AngularFireStorage,private dialog: MatDialog,
     private tatuadoresService: TatuadoresService,
     private Tatuajesdestacados:TatuajesdestacadosService,
     private  portafolioService : PortafolioService,
     public loginService:LoginService, private modalService:BsModalService, private fb:FormBuilder, private router : Router, private reservaService: ReservaService, private registerService: RegisterService
     ){
      this.resgistroTat = this.fb.group({
        nombre:['',Validators.required],
        apellido:['',Validators.required],
        correo:['',Validators.required],
        password:['',Validators.required],
        edad:['',Validators.required],
        sexo:['',Validators.required],
        imagen:['',Validators.required]
      });
      this.getTatuadores();
    this.getTatuajesDestacados();
    this.ObtenerCosto();
     }

  

  EliminarTatuador(id: number) {
    this.tatuadoresService.EliminarTatuadores(id)
      .subscribe((respuesta: any) => {
        console.log(respuesta);
        this.getTatuadores();
      })
  }


  openModal(tipo: number, id: number) {

    const dialogRef = this.dialog.open(ModalgalleryComponent, {
      width: '80%',
      height: '80%',
      data: {
        tipo: tipo,
        idportafolio: id,
      }
    });
  }

  abrirModal() {
    this.modalRef = this.modalService.show(this.template, this.config);
  }


  // Método para abrir la ventana modal

  public getTatuadores() {
    this.tatuadoresService.getTatuadores().subscribe((respuesta: any) => {
      this.tatuadores = respuesta.data;
      for (let i = 0; i < this.tatuadores.length; i++) {
        this.tatuadoresService.getEspecialidades(this.tatuadores[i].IdUsuario)
          .subscribe((response: any) => {
            // Assuming the response is an array of objects with a "nombre" property
            const especialidades = response.data.map((especialidad: any) => especialidad.NomEspecialidad);
            this.tatuadores[i].NomEspecialidad = especialidades;
          });
      }
    });
  }


  public getTatuajesDestacados() {
    this.Tatuajesdestacados.getTatuajesDestacados()
      .subscribe((respuesta: any) => {
        this.tatuajesDestacados = respuesta.data;
      })
  }

  public EliminarTatuajesDestacado(id: number) {
    this.Tatuajesdestacados.EliminarTatuajesDestacado(id)
      .subscribe((respuesta: any) => {
        this.getTatuajesDestacados();
      })
  }

  guardar() {

    let datos: Itatuador = {
      Nombre: this.resgistroTat.value.nombre,
      Apellido: this.resgistroTat.value.apellido,
      CorreoElectronico: this.resgistroTat.value.correo,
      Contrasenia: this.resgistroTat.value.password,
      Edad: this.resgistroTat.value.edad,
      Sexo: this.resgistroTat.value.sexo,
      Fotografia: this.urlimagen
    }
    this.guardarUsuario(datos);
  }



  guardarUsuario(usuario:Itatuador) {

    this.registerService.register(usuario, 2).subscribe((response) => {

      console.log(response);
      this.getTatuadores();
      this.modalRef?.hide();
    },
      (error: HttpErrorResponse) => {
        // Si ocurre un error, aquí puedes obtener el código de error de la consulta POST.
        console.error('Código de error:', error.status);
        console.error('Mensaje de error:', error.message);
      });
  }

  ObtenerCosto() {
    this.reservaService.getCostoReserva().subscribe((respuesta:any) =>{
      console.log(respuesta.data[0].CostoPago);
      this.reservaService.CostoReserva =respuesta.data[0].CostoPago;
    })
  }
  urlimagen!: string;

  async onfileChange(event:any){
    const file = event.target.files[0];
    if(file){
      const path = `Referencias/${file.name}`
      const uploadTask = await this.fireStorage.upload(path, file)
      const url = await uploadTask.ref.getDownloadURL()
      console.log(url);
      this.urlimagen = url;
    }
  }
}
