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




  tatusPortafolio!: TatusPortafolio[];

  tatusPortafolio1!: TatusPortafolio[];
  tatusPortafolio2!: TatusPortafolio[];
  tatusPortafolio3!: TatusPortafolio[];
  tatusPortafolio4!: TatusPortafolio[];






  
  @ViewChild('template') template!: string;
  registerService: any;
  constructor( private fireStorage:AngularFireStorage,private fb:FormBuilder,private modalService:BsModalService,public loginService:LoginService,private Tatuajesdestacados:TatuajesdestacadosService,private portafolioService:PortafolioService,@Inject(MAT_DIALOG_DATA) private data: any,private dialogRef: MatDialogRef<ModalgalleryComponent>) {
    this.tipo=data.tipo;
    this.id_portafolio = data.idportafolio;
    this.tatusPortafolio1 = [
      {
      IdImagen: 1,
      LinkImagen:"https://cdn.pixabay.com/photo/2023/07/01/20/01/young-woman-8100839_1280.png",
      },
      {
        IdImagen: 2,
        LinkImagen:"https://www.tattoorockers.cl/wp-content/uploads/2020/11/marlon26.jpg",
      },
      {
        IdImagen: 3,
        LinkImagen:"https://www.tattoorockers.cl/wp-content/uploads/2020/11/marlon23.jpg",
      }
    ]
    this.tatusPortafolio2 = [
      {
      IdImagen: 4,
      LinkImagen:"https://cdn.pixabay.com/photo/2023/06/16/17/21/man-8068531_1280.jpg",
      },
      {
        IdImagen: 5,
        LinkImagen:"https://www.tattoorockers.cl/wp-content/uploads/2020/11/anathan08.jpg",
      },
      {
        IdImagen: 6,
        LinkImagen:"https://www.tattoorockers.cl/wp-content/uploads/2020/11/marlon34.jpg",
      }
    ]
    this.tatusPortafolio3 = [
      {
      IdImagen: 7,
      LinkImagen:"http://localhost:4200/assets/ManoMandala.jpg",
      },
      {
        IdImagen: 8,
        LinkImagen:"https://www.tattoorockers.cl/wp-content/uploads/2020/11/marlon47.jpg",
      },
      {
        IdImagen: 9,
        LinkImagen:"https://www.tattoorockers.cl/wp-content/uploads/2020/11/anathan03.jpg",
      }
    ]
    this.tatusPortafolio4 = [
      {
      IdImagen: 10,
      LinkImagen:"http://localhost:4200/assets/tatuajehombro.jpg",
      },
      {
        IdImagen: 11,
        LinkImagen:"https://www.tattoorockers.cl/wp-content/uploads/2021/01/Marlon_10.jpeg",
      },
      {
        IdImagen: 12,
        LinkImagen:"https://www.tattoorockers.cl/wp-content/uploads/2021/01/Cristian_11.png",
      },
      {
        IdImagen: 13,
        LinkImagen:"https://www.tattoorockers.cl/wp-content/uploads/2021/01/Julio_11.png",
      }
    ]

    this.resgistroTat = this.fb.group({
      NomImagen:['',Validators.required],
      LinkImageno:['',Validators.required],
      Descripcion:['',Validators.required],
    });

    if(this.tipo==1){  
      switch (this.id_portafolio){
        case 1:
          this.tatusPortafolio = this.tatusPortafolio1;
          break;
        case 2:
          this.tatusPortafolio = this.tatusPortafolio2;
          break;
        case 3:
          this.tatusPortafolio = this.tatusPortafolio3;
          break;
        case 4:
          this.tatusPortafolio = this.tatusPortafolio4;
        break;
      }
    }else{
      this.tatusPortafolio = [
        {
          IdImagen: 2,
          LinkImagen:"https://www.tattoorockers.cl/wp-content/uploads/2020/11/marlon26.jpg",
        },
        {
          IdImagen: 3,
          LinkImagen:"https://www.tattoorockers.cl/wp-content/uploads/2020/11/marlon23.jpg",
        },
        {
          IdImagen: 5,
          LinkImagen:"https://www.tattoorockers.cl/wp-content/uploads/2020/11/anathan08.jpg",
        },
        {
          IdImagen: 6,
          LinkImagen:"https://www.tattoorockers.cl/wp-content/uploads/2020/11/marlon34.jpg",
        },
        {
          IdImagen: 8,
          LinkImagen:"https://www.tattoorockers.cl/wp-content/uploads/2020/11/marlon47.jpg",
        },
        {
          IdImagen: 9,
          LinkImagen:"https://www.tattoorockers.cl/wp-content/uploads/2020/11/anathan03.jpg",
        },
        {
          IdImagen: 11,
          LinkImagen:"https://www.tattoorockers.cl/wp-content/uploads/2021/01/Marlon_10.jpeg",
        },
        {
          IdImagen: 12,
          LinkImagen:"https://www.tattoorockers.cl/wp-content/uploads/2021/01/Cristian_11.png",
        },
        {
          IdImagen: 13,
          LinkImagen:" https://www.tattoorockers.cl/wp-content/uploads/2021/01/Julio_11.png",
        }
      ]
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

  }

  //

  EliminarTatuajePortafolio(): void {

  }





  guardarUsuario(usuario:Itatuador) {

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
  
          this.modalRef?.hide();
          // Opcionalmente, puedes actualizar la lista de tatuajes en el modal después de agregar uno nuevo.
          // Puedes obtener la lista actualizada de tatuajes aquí y actualizar la variable "this.tatusPortafolio".
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
