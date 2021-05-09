import { Component, OnInit } from '@angular/core';
import { DispositivoMovil } from '../CelularesNaac/models/dispositivo-movil';
import { DispositivoMovilService } from '../services/dispositivo-movil.service';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})
export class PrincipalComponent implements OnInit {

  listaDispositivos: DispositivoMovil[];
  constructor(private DispositivoService: DispositivoMovilService) { }

  ngOnInit(): void {
    this.listaDispositivos = [];
    this.Dispositivo()
  }
  Dispositivo() {
    this.DispositivoService.todos().subscribe(
      r =>{
        this.listaDispositivos = r;
      }
    )
  }



}
