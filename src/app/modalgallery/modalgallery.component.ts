import { Component, Inject, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AgregarTatu, TatusPortafolio } from '../Interfaces/tatuadores';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { PortafolioService } from 'src/portafolio.service';
import { TatuajesdestacadosService } from 'src/tatuajesdestacados.service';
import { LoginService } from '../services/login/login.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Filew, Itatuador } from '../Interfaces/user';
import { HttpErrorResponse } from '@angular/common/http';
import { AngularFireStorage } from '@angular/fire/compat/storage';

@Component({
  selector: 'app-modalgallery',
  templateUrl: './modalgallery.component.html',
  styleUrls: ['./modalgallery.component.css']
})
export class ModalgalleryComponent {
  local = JSON.parse(localStorage.getItem('UsuarioLogueado')!);
  fechaActual =  new Date();
  tatusPortafolio!: TatusPortafolio[];
  selectedImage: string | undefined;
  idImagenexpandida!: number;
  tipo: number=0;
  modalRef?: BsModalRef;
  resgistroTat : FormGroup;
  id_portafolio!: number;

  urlimagen!: string;

  config={
    animated:true,
  };
  @ViewChild('template') template!: string;
  registerService: any;
  constructor( private fireStorage:AngularFireStorage,private fb:FormBuilder,private modalService:BsModalService,public loginService:LoginService,private Tatuajesdestacados:TatuajesdestacadosService,private portafolioService:PortafolioService,@Inject(MAT_DIALOG_DATA) private data: any,private dialogRef: MatDialogRef<ModalgalleryComponent>) {
    this.tipo=data.tipo;
    this.id_portafolio = data.idportafolio;


    this.resgistroTat = this.fb.group({
      NomImagen:['',Validators.required],
      LinkImageno:['',Validators.required],
      Descripcion:['',Validators.required],
    });

    if(this.tipo==1){
      this.portafolioService.getPortafolioByIdTatuador(this.id_portafolio)
      .subscribe((respuesta: any) =>{
        this.tatusPortafolio = respuesta.data;
        console.log(this.tatusPortafolio);
      })
    }else{
      this.Tatuajesdestacados.getTatuajesNoDestacados()
      .subscribe((respuesta: any) =>{
        this.tatusPortafolio = respuesta.data;
      })
    }
    
  }

  closeDialog() {
    this.dialogRef.close();
  }
  
  expandImage(image: string,id: number) {
    if (this.selectedImage === image) {
      this.selectedImage = "";
      this.idImagenexpandida = -1;
    } else {
      this.idImagenexpandida = id;
      this.selectedImage = image;
      console.log(this.idImagenexpandida);
    }
  }


  newImageUrl: string = ''; // Variable para almacenar el link de la nueva imagen

  // Función para agregar el link de la nueva imagen al arreglo "images"
  AgregarTatuajePortafolio(): void {
    switch (this.tipo){
      case 1:
        this.modalRef = this.modalService.show(this.template,this.config);
        break;
      case 2:
      this.Tatuajesdestacados.AgregarTatuajesDestacado(this.idImagenexpandida)
      .subscribe((respuesta: any) =>{
        this.Tatuajesdestacados.getTatuajesNoDestacados()
        .subscribe((respuesta: any) =>{
          this.tatusPortafolio = respuesta.data;
        })
      })
        break;
      default: break;
    }
  }

  //

  EliminarTatuajePortafolio(): void {
    this.portafolioService.EliminarTatuajeDePortafolioByTatuaje(this.idImagenexpandida)
    .subscribe((respuesta: any) =>{
      this.portafolioService.getPortafolioByIdTatuador(this.id_portafolio)
      .subscribe((respuesta: any) =>{
        this.tatusPortafolio = respuesta.data;
        console.log(this.tatusPortafolio);
      })
    })
  }





  guardarUsuario(usuario:Itatuador) {

    this.registerService.register(usuario, 2).subscribe(  (response: any) => {
      console.log(response);
    },
    (error: HttpErrorResponse) => {
      // Si ocurre un error, aquí puedes obtener el código de error de la consulta POST.
      console.error('Código de error:', error.status);
      console.error('Mensaje de error:', error.message);
    });
  }












    files!:File;

    onSelect(event:any){
      console.log(event);
      this.files = event.addedFiles;
    }

    onRemove(event:any){

    }

    guardar() {
  
      let datos: AgregarTatu = {
        NomImagen: this.resgistroTat.value.NomImagen,
        LinkImagen: this.urlimagen,
        Fecha: "this.fechaActual",
        Descripcion: this.resgistroTat.value.Descripcion,
        IdPortafolio: this.id_portafolio,
        IdTipoImg: 1,
      };
  
      this.portafolioService.AgregarTatuajePortafolio(datos).subscribe(
        (response: any) => {
          console.log(response); // Manejar la respuesta si es necesario
          this.portafolioService.getPortafolioByIdTatuador(this.id_portafolio)
          .subscribe((respuesta: any) =>{
            this.tatusPortafolio = respuesta.data;
            console.log(this.tatusPortafolio);
          })
          this.modalRef?.hide();
          // Opcionalmente, puedes actualizar la lista de tatuajes en el modal después de agregar uno nuevo.
          // Puedes obtener la lista actualizada de tatuajes aquí y actualizar la variable "this.tatusPortafolio".
        },
        (error: any) => {
          console.error('Error:', error); // Manejar el error si es necesario
          // Puedes mostrar un mensaje de error al usuario aquí si lo deseas.
        }
      );
    }

    async onfileChange(event:any){
      const file = event.target.files[0];
      if(file){
        const path = `Portafolios/${file.name}`
        const uploadTask = await this.fireStorage.upload(path, file)
        const url = await uploadTask.ref.getDownloadURL()
        console.log(url);
        this.urlimagen = url;
      }
    }
}
