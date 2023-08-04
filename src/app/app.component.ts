import { Component, ElementRef, NgModule, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  
})
export class AppComponent {

  local = JSON.parse(localStorage.getItem('UsuarioLogueado')!);
  title = 'TattooRes';
  ngOnInit(){

  }
  constructor(private router : Router){};
  goTo(fragment:any){
    this.isNavbarHidden = !this.isNavbarHidden;
    this.router.navigateByUrl('profile#'+fragment);
  }

  irhorario() {
    this.isNavbarHidden = !this.isNavbarHidden;
    this.router.navigate(['/horario']);
  }
  cerrar(){
    
    localStorage.removeItem('UsuarioLogueado');
  }


  isNavbarHidden = false;


}
