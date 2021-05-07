import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-perfil-lider-avaluos',
  templateUrl: './perfil-lider-avaluos.component.html',
  styleUrls: ['./perfil-lider-avaluos.component.css']
})
export class PerfilLiderAvaluosComponent implements OnInit {

  activa: boolean = false;
  constructor() { }

  ngOnInit(): void {
  }
  alternarBarra(){
    this.activa = !this.activa
  }

}
