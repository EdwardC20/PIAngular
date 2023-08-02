import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-modal-tdestacados',
  templateUrl: './modal-tdestacados.component.html',
  styleUrls: ['./modal-tdestacados.component.css']
})
export class ModalTdestacadosComponent implements OnInit {
  name!: string;
  description!: string;

  constructor() { }

  ngOnInit(): void {
  }

  closeModal() {
    this.name = '';
    this.description = '';
  }

  onSubmit() {
    console.log('Nombre:', this.name);
    console.log('Descripción:', this.description);
    this.closeModal();
  }
}