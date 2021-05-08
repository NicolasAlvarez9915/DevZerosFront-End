import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { InteresadoService } from 'src/app/services/interesado.service';
import { Interesado } from '../models/interesado';

@Component({
  selector: 'app-perfil-lider-avaluos',
  templateUrl: './perfil-lider-avaluos.component.html',
  styleUrls: ['./perfil-lider-avaluos.component.css']
})
export class PerfilLiderAvaluosComponent implements OnInit {

  activa: boolean = false;
  mostrar: string;
  mostrarInterno: string;
  filtroClientes: string;


  listaClientes: Interesado[];

  ClienteRegistrar: Interesado;
  clienteConsuta: Interesado;
  clienteActualizar: Interesado = new Interesado();

  formularioRegistroInteresado: FormGroup;
  
  constructor(
    private formBuilder: FormBuilder,
    private interesadoService: InteresadoService
  ) { }

  ngOnInit(): void {
    this.mostrar = 'Principal';
    this.mostrarInterno = 'Principal';
    this.listaClientes = [];
    this.buildFormInteresado();
    this.clientes();
    this.clienteActualizar.telefono = "";
    this.clienteActualizar.nombres = "";
    this.clienteActualizar.apellidos = "";
  }

  actualizarCliente(){
    alert("Solo se actualizaran los campos en los que ingreso datos.");
    if(this.clienteActualizar.nombres.trim() != "" && this.clienteActualizar.nombres != undefined){
      this.clienteConsuta.nombres = this.clienteActualizar.nombres
    }
    
    if(this.clienteActualizar.apellidos.trim() != "" && this.clienteActualizar.apellidos != undefined){
      this.clienteConsuta.apellidos = this.clienteActualizar.apellidos
    }
    
    if(this.clienteActualizar.telefono.trim() != "" && this.clienteActualizar.telefono != undefined){
      this.clienteConsuta.telefono = this.clienteActualizar.telefono
    }
    this.interesadoService.actualizar(this.clienteConsuta).subscribe(
      r=>{alert("Datos actualizados");}
    )
  }

  clientes(){
    this.interesadoService.todos().subscribe(
      r => {
        this.listaClientes = r;
      }
    );
  }

  verCliente(cliente: Interesado){
    this.clienteConsuta = cliente;
    this.mostrar = "Cliente";
  }

  alternarBarra() {
    this.activa = !this.activa;
  }
  private buildFormInteresado() {
    this.ClienteRegistrar = new Interesado();
    this.ClienteRegistrar.apellidos = '';
    this.ClienteRegistrar.identificacion = '';
    this.ClienteRegistrar.nombres = '';
    this.ClienteRegistrar.telefono = '';

    this.formularioRegistroInteresado = this.formBuilder.group({
      identificacion: [this.ClienteRegistrar.identificacion, Validators.required],
      nombres: [this.ClienteRegistrar.nombres, Validators.required],
      apellidos: [this.ClienteRegistrar.apellidos, Validators.required],
      telefono: [this.ClienteRegistrar.telefono, Validators.required]
    });
  }

  get control() {
    return this.formularioRegistroInteresado.controls;
  }


  onSubmit() {
    if (this.formularioRegistroInteresado.invalid) {
      return;
    }
    this.registrarInteresado();
  }
  registrarInteresado() {
    this.ClienteRegistrar = this.formularioRegistroInteresado.value;
    this.ClienteRegistrar.fechaRegistro = new Date();
    this.interesadoService.buscar(this.ClienteRegistrar.identificacion).subscribe(
      r => {
        if (r == null) {
          this.interesadoService.registrar(this.ClienteRegistrar).subscribe(
            r => {
              if(r!=null){
                alert("Cliente registrado correctamente.");
              }
            }
          )
        } else {
          alert("Persona existente");
        }
      }
    );
  }

}
