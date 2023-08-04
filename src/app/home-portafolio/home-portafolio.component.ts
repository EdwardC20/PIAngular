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
        this.tatuadores= [
          {  IdUsuario: 1,
            Nombre: "Cristian",
            Apellido: "Donoso",
            AniosExperiencia:  2015,
            Fotografia:  "https://www.tattoorockers.cl/wp-content/uploads/2021/01/Julio_01.png",
            NomEspecialidad:["Acuarela","Polinesio","Anime"]},
            {  IdUsuario: 2,
              Nombre: "Julio",
              Apellido: "Escalona",
              AniosExperiencia:  2018,
              Fotografia:  "https://www.tattoorockers.cl/wp-content/uploads/2020/10/ASoto_01.png",
              NomEspecialidad:["Japonés","Maor","Samoano"]},
              {  IdUsuario: 3,
                Nombre: "Emerson",
                Apellido: "Rojas",
                AniosExperiencia:  2002,
                Fotografia:  "https://www.tattoorockers.cl/wp-content/uploads/2020/10/HTatau_01.png",
                NomEspecialidad:["Tradicional","Letras","Black and gray"]},
                {  IdUsuario: 4,
                  Nombre: "Cristian",
                  Apellido: "Silva",
                  AniosExperiencia:  2010,
                  Fotografia:  "https://www.tattoorockers.cl/wp-content/uploads/2020/10/Csilva_01.png",
                  NomEspecialidad:["Realismo","Full color","Oriental"]},
        ]
  }


  public getTatuajesDestacados() {

      this.tatuajesDestacados= [
        {  
          Nombre: "Cristian",
          Apellido: "Donoso",
          IdImagen: 90,
          NomImagen: "La montaña asiática",
          LinkImagen: "https://cdn.pixabay.com/photo/2023/07/01/20/01/young-woman-8100839_1280.png",
          Fecha: "2023-07-08",
          Descripcion: "Este tatuaje en la espalda muestra una impresionante montaña asiática rodeada de exuberantes flores.",
        },
        {  
          Nombre: "Julio",
          Apellido: "Escalona",
          IdImagen: 91,
          NomImagen: "Rostro de la tribu",
          LinkImagen: "https://cdn.pixabay.com/photo/2023/06/16/17/21/man-8068531_1280.jpg",
          Fecha: "2023-02-01",
          Descripcion:"Este tatuaje tribal en el rostro es una manifestación única de la cultura tribal y el arte corporal abarcando áreas específicas del rostro, realzando los rasgos y creando un aspecto impactante."
        },
        {  
          Nombre: "Emerson",
          Apellido: "Rojas",
          IdImagen: 93,
          NomImagen: "El hombro del rey",
          LinkImagen: "http://localhost:4200/assets/tatuajehombro.jpg",
          Fecha: "2023-07-22",
          Descripcion:"En el diseño, se destaca un cuervo majestuoso y detallado, representado en un estilo realista o en un estilo más estilizado y artístico, según las preferencias del individuo."
        },
        {  
          Nombre: "Cristian",
          Apellido: "Silva",
          IdImagen: 92,
          NomImagen: "La mano de buda",
          LinkImagen: "http://localhost:4200/assets/ManoMandala.jpg",
          Fecha: "2023-06-12",
          Descripcion: "Este tatuaje de una mandala en la mano es un diseño intrincado y detallado que adorna el dorso de la mano. La mandala, un símbolo sagrado en varias tradiciones espirituales, se presenta en forma de un círculo perfecto que se irradia desde el centro hacia el exterior. El tatuaje incorpora una variedad de patrones geométricos y elementos decorativos en su diseño.",
        },
  ]}

  public EliminarTatuajesDestacado(id: number) {

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
  }



  guardarUsuario(usuario:Itatuador) {
  }

  ObtenerCosto() {
    this.reservaService.CostoReserva=this.reservaService.CostoReserva;
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
