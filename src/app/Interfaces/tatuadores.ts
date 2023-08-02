export class tatuadores{
  IdUsuario!: number;
  Nombre!: string;
  Apellido!:string;
  AniosExperiencia!: number;
  Fotografia!: string;
  NomEspecialidad!:  string[];
}

export class TatuajesDestacados{
  Nombre!: string;
  Apellido!:string;
  IdImagen!: number;
  NomImagen!: string;
  LinkImagen!: string;
  Fecha!: string;
  Descripcion!: string;
}


export class TatusPortafolio{
  IdImagen!: number;
  LinkImagen!:string;
}


export class AgregarTatu{
  NomImagen!: string;
  LinkImagen!: string;
  Fecha!: string;
  Descripcion!: string;
  IdPortafolio!: number;
  IdTipoImg!:1;
}

export class ListadoReservas{
  IdReserva!: number;
  Nombre_Tatuador!: string;
  Apellido_Tatuador!: string;
  Fecha_Reserva!: Date;
  Nombre_Cliente!: string;
  Apellido_Cliente!: string;
  Idpago!: number;
  Monto!: number;
  FechaPago!: Date;
}
