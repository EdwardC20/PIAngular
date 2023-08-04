import { Component, OnInit, ViewChild } from '@angular/core';
import { Calendar, CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import interactionPlugin from '@fullcalendar/interaction';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import esLocale from '@fullcalendar/core/locales/es';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ReservaService } from '../services/reserva/reserva.service';
import { HttpErrorResponse } from '@angular/common/http';
import { AngularFireStorage } from '@angular/fire/compat/storage';

@Component({
  selector: 'app-horario2',
  templateUrl: './horario2.component.html',
  styleUrls: ['./horario2.component.css']
})
export class horario2Component {
  pago:any[]=[];
  onDataRecieved(data: any ) {
    this.pago=data;
    this.guardar();

  }
  modal = "none";
  local = JSON.parse(localStorage.getItem('UsuarioLogueado')!);
  tatuador = 2;

    // Evento de clic para abrir el modal

    changeTatuador(id:any){

      this.tatuador = id;

    }
  public am():void {
    console.log("jola");
    this.modal = "block";
  }

  public AbrirModal() {
    console.log("jola");
    this.modal = "block";
  }

  // Evento de clic para cerrar el modal
  public CerarrModa() {
    this.modal = "none";
  }

  reservas2:any[]=[];
  tattootypes: any[]=[];
  modalRef?: BsModalRef;
  reservaForm : FormGroup;
  reservas:any[]=[{title:'Reserva X', start:'2023-07-24T10:00:00'}];

  async ngOnInit() {



    // Obtener los records de PocketBase y añadirlos al arreglo 'reservas' como objeto {title:'reservado', start:fecha+T+hora}
    /* const record = await pb.collection('booking').getFullList();

    record.forEach(element=>{

      this.reservas.push({title: 'Reservado', start: element['fecha']+'T'+element['hora']});

    })
    const type = await pb.collection('tattoo_type').getFullList();
    type.forEach(element=>{
        this.tattootypes.push({nombre:element['name'],id:element['id']});
    }) */

  }
  inicializarData(){
  }
  title:string='';
  calendarOptions: CalendarOptions = {
    initialView: 'timeGridWeek',
  // MUST ensure `this` context is maintained


    plugins: [dayGridPlugin,timeGridPlugin,listPlugin,interactionPlugin],
    weekends: true,
    firstDay:1,
    allDaySlot:false,
    locale: esLocale,
    slotMinTime:'08:00:00',
    slotMaxTime:'21:00:00',
    slotDuration: '01:00:00',
    height:360,
    dayMaxEvents:2,
    slotLabelFormat:{
      hour:'2-digit',
      minute:'2-digit',
      meridiem:false,

      hour12:false
    },
    dayHeaderFormat:{
      weekday: 'short',
      day:'2-digit',
      month: '2-digit',
    },
    titleFormat:{
      month:'long',
      day: 'numeric',
    },
    selectable: true,

    initialEvents: this.reservas,

    dateClick:this.handleDateClick.bind(this),

  };
  config={
    animated:true,
  };
  start : any;
  time : any;
  @ViewChild('template') template!: string;
  constructor(private fireStorage:AngularFireStorage,private modalService:BsModalService, private fb:FormBuilder, private router : Router, private reservaService: ReservaService){
    this.reservaForm = this.fb.group({
      FechaInicio: [''],
      FechaFin: [''],
      Comentario:['Hola'],
      Descripción:['Mandala Arcoiris'],
      IdUsuario: ['1'],
      IdUsuarioT: ['2'],
      IdImagen: ['6'],
      IdPago: ['2']

    });

  };

  handleDateClick(arg:any) {
    this.reservaService.FechaReserva=arg.dateStr;
    console.log(arg.dateStr);
    this.reservaForm.value.FechaInicio = arg.dateStr;
    this.reservaForm.value.FechaFin = arg.dateStr;
    this.start= arg.dateStr
    this.modalRef = this.modalService.show(this.template,this.config);
    console.log(this.start);
  }

  /* function (info) {
    let cadena: any = info.dateStr;
    console.log(cadena.split('T')[1].split(':'));
  } */
  async guardar(){
    console.log(this.start);
    this.reservaForm.value.FechaInicio = this.start.split('T')[0]+'T'+this.start.split('T')[1].split(':')[0]+':00:00';
    this.reservaForm.value.FechaFin = this.start.split('T')[0]+'T'+this.start.split('T')[1].split(':')[0]+':00:00';
    console.log(this.reservaForm.value.FechaInicio);
    console.log(this.reservaForm.value);


    console.log(this.reservaForm.value);
    let evento={
      title:'Reserva Guardada',
      start: this.start.split('T')[0]+'T'+this.start.split('T')[1].split(':')[0]+':00:00',
    };
    this.reservas.push(evento);
    this.modalRef?.hide();
    console.log(evento);

    this.calendarOptions.events=this.reservas;

    /* const usuario = await pb.collection('users').authWithPassword("test@mail.com", "7G9kH5p2W4L");
    pb.admins.authWithPassword("angelo.orellana1901@alumnos.ubiobio.cl" , "Racering1*2")

    const user = await pb.collection('users').create({

      email:this.reservaForm.value.email,
      name:this.reservaForm.value.name,
      password:'pa2321f1',
      passwordConfirm:'pa2321f1'

    });
    console.log(this.reservaForm.value.type);
    const descrip = await pb.collection('tattoo_desc').create({
      tattoo_type:this.reservaForm.value.type,
      desc:this.reservaForm.value.description
    })
    console.log("descrip:");
    console.log(descrip);

    const final = pb.collection('booking').create({
      user_id:user.id,
      nombre: this.reservaForm.value.name,
      desc:descrip.id,
      fecha: this.reservaForm.value.fecha,
      hora:this.reservaForm.value.hora,
      restricionesMedicas:this.reservaForm.value.restricciones,
    });
    console.log(final);
    console.log(this.reservaForm.value); */





    this.reservaForm.value.fecha = '';
    this.reservaForm.value.hora='';
    this.reservaForm.value.restricciones='';
    this.reservaForm.value.name='';
    this.reservaForm.value.description ='';

    /* final.then(function(){
      window.location.reload();
    }); */
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
