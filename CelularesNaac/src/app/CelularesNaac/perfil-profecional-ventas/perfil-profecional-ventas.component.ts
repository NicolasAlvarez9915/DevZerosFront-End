import { Component, OnInit } from '@angular/core';
import { DispositivoMovilService } from 'src/app/services/dispositivo-movil.service';
import { FacturaCompraService } from 'src/app/services/factura-compra.service';
import { FacturaVentaService } from 'src/app/services/factura-venta.service';
import { InteresadoService } from 'src/app/services/interesado.service';
import { DispositivoMovil } from '../models/dispositivo-movil';
import { FacturaCompra } from '../models/factura-compra';
import { FacturaVenta } from '../models/factura-venta';
import { Interesado } from '../models/interesado';

@Component({
  selector: 'app-perfil-profecional-ventas',
  templateUrl: './perfil-profecional-ventas.component.html',
  styleUrls: ['./perfil-profecional-ventas.component.css']
})
export class PerfilProfecionalVentasComponent implements OnInit {

  activa: boolean = false;
  mostrar: string;
  mostrarInterno: string;
  idInteresado: string = "";
  interesadoNuevo: boolean = true;
  codigoDispositivo: string;
  cantidadDispositvo: number = 1;

  interesadoEncontrado: Interesado;
  dispositivoEncontrado: DispositivoMovil;
  facturaVentaGenerada: FacturaVenta;
  dispositivoConsulta: DispositivoMovil;

  listaDispositivosVenta: DispositivoMovil[];
  listadispositivos: DispositivoMovil[];
  listaFcaturasCompra: FacturaCompra[];

  constructor(
    private interesadoService: InteresadoService,
    private dispositivoService: DispositivoMovilService,
    private facturaVentaService: FacturaVentaService,
    private facturaCompraService: FacturaCompraService
  ) { }

  ngOnInit(): void {
    this.interesadoEncontrado = new Interesado();
    this.listaDispositivosVenta = [];
    this.dispositivos();
  }
  facturasCompra(){
    this.facturaCompraService.buscarFacturaDispositivo(this.dispositivoConsulta.codigo).subscribe(
      r =>{
        this.listaFcaturasCompra = r;
      }
    )
  }
  verFacturasDispositivos(dispositivo: DispositivoMovil){
    this.dispositivoConsulta = dispositivo;
    this.facturasCompra();
    this.mostrar = "Producto";
  }
  dispositivos() {
    this.dispositivoService.todos().subscribe(
      r=>{
        this.listadispositivos = r;
      }
    )
  }
  alternarBarra() {
    this.activa = !this.activa;
  }
  anadirDispositivoFacturaVenta() {

    if (this.cantidadDispositvo > this.dispositivoEncontrado.cantidad) {
      alert("Debe ingresar una cantidad menor a la actual")
    } else {
      this.dispositivoEncontrado.cantidad = this.cantidadDispositvo;
      this.listaDispositivosVenta.unshift(this.dispositivoEncontrado);
      if (this.interesadoEncontrado.nombres == undefined) {
        alert("Debe buscar un cliente");
      } else {
        this.facturaVentaService.generarFactura(this.listaDispositivosVenta, this.interesadoEncontrado).subscribe(
          r => {
            this.facturaVentaGenerada = r;
            this.dispositivoEncontrado = new DispositivoMovil();
          }
        )
      }
    }
  }

  buscarIntersado() {
    this.interesadoService.buscar(this.idInteresado).subscribe(
      r => {
        if (r != null) {
          this.interesadoEncontrado = r
          this.interesadoNuevo = false;
        } else {
          this.interesadoNuevo = true;
          this.interesadoEncontrado.nombres = "";
          this.interesadoEncontrado.identificacion = this.idInteresado
        }
      }
    )
  }

  registrarFactura() {
    if (this.facturaVentaGenerada.total == undefined) {
      alert("Debe generar la factura");
    } else {
      this.facturaVentaGenerada.fechaFactura = new Date();
      this.facturaVentaService.registrar(this.facturaVentaGenerada).subscribe(
        r => {
          if (r != null) {
            this.facturaVentaGenerada = r;
            alert("Factura registrada");
          }
        }
      )
    }
  }

  buscarDispositivo() {
    this.dispositivoService.buscar(this.codigoDispositivo).subscribe(
      r => {
        if (r != null) {
          this.dispositivoEncontrado = r;
        } else {
          alert("Dispositivo inexistente");
        }
      }
    )
  }

}
