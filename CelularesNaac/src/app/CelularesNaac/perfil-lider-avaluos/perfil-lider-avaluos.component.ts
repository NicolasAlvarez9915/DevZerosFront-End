import { LEADING_TRIVIA_CHARS } from '@angular/compiler/src/render3/view/template';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { element } from 'protractor';
import { VirtualTimeScheduler } from 'rxjs';
import { DispositivoMovilService } from 'src/app/services/dispositivo-movil.service';
import { FacturaCompraService } from 'src/app/services/factura-compra.service';
import { InteresadoService } from 'src/app/services/interesado.service';
import { ProveedorService } from 'src/app/services/proveedor.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { DispositivoMovil } from '../models/dispositivo-movil';
import { FacturaCompra } from '../models/factura-compra';
import { Interesado } from '../models/interesado';
import { Proveedor } from '../models/proveedor';
import { Usuario } from '../models/usuario';

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
  codigoDispositivo: string;
  filtroProveedores: string;
  selectedFile: string;
  nitProveedorBuscar: string;
  dispositivoInexistente: boolean = false;
  cantidadDispositivo: number = 0;

  listaClientes: Interesado[];
  listaProveedores: Proveedor[];
  listaDispositivosCompra: DispositivoMovil[];

  ClienteRegistrar: Interesado;
  usuarioRegistrar: Usuario;
  contrasenaConfirmar: string;
  clienteConsuta: Interesado;
  clienteActualizar: Interesado = new Interesado();
  proveedorRegistrar: Proveedor;
  imagen: File;
  proveedorEncontrado: Proveedor;
  dispositivoRegistrar: DispositivoMovil;
  facturaCompraGenerada: FacturaCompra;

  formularioRegistroInteresado: FormGroup;
  formularioRegistroProveedor: FormGroup;
  formularioRegistroDispositivo: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private interesadoService: InteresadoService,
    private usuarioService: UsuarioService,
    private proveedorService: ProveedorService,
    private sanitizer: DomSanitizer,
    private dispositivoService: DispositivoMovilService,
    private facturaCompraService: FacturaCompraService
  ) { }

  ngOnInit(): void {
    this.mostrar = 'Principal';
    this.mostrarInterno = 'Principal';
    this.nitProveedorBuscar = "";
    this.proveedorEncontrado = new Proveedor();
    this.listaClientes = [];
    this.listaProveedores = [];
    this.listaDispositivosCompra = [];
    this.buildFormInteresado();
    this.buildFormProveedor();
    this.buildFormDispositivo();
    this.clientes();
    this.proveedores();
    this.clienteActualizar.telefono = "";
    this.clienteActualizar.nombres = "";
    this.clienteActualizar.apellidos = "";
  }

  anadirDispositivoFacturaCompra(){
    this.dispositivoRegistrar.cantidad=this.cantidadDispositivo;
    this.listaDispositivosCompra.unshift(this.dispositivoRegistrar);
    if (this.proveedorEncontrado.nit == undefined) {
      alert("Debe buscar un proveedor");
    } else {
      this.facturaCompraService.generarFactura(this.listaDispositivosCompra, this.proveedorEncontrado).subscribe(
        r => {
          this.facturaCompraGenerada = r;
        }
      )
    }
  }

  registrarFactura() {
    if (this.facturaCompraGenerada.total == undefined) {
      alert("Debe generar la factura");
    } else {
      this.facturaCompraGenerada.fechaFactura = new Date();
      this.facturaCompraService.registrar(this.facturaCompraGenerada).subscribe(
        r => {
          if (r != null) {
            this.facturaCompraGenerada = r;
            this.dispositivoService.registrar(this.listaDispositivosCompra).subscribe(
              r => {
                if (r != null) {
                  this.listaDispositivosCompra = [];
                  alert("Factura registrada correctamente");
                }
              }
            )
          }
        }
      )
    }
  }
  buildFormDispositivo() {
    this.dispositivoRegistrar = new DispositivoMovil();
    this.dispositivoRegistrar.marca = "";
    this.dispositivoRegistrar.modelo = "";
    this.dispositivoRegistrar.precioCompra = 0;
    this.dispositivoRegistrar.precioVenta = 0;
    this.dispositivoRegistrar.cantidad = 0;
    this.dispositivoRegistrar.tipoPantalla = "";
    this.dispositivoRegistrar.resolucion = "";
    this.dispositivoRegistrar.camara = "";
    this.dispositivoRegistrar.procesador = "";
    this.dispositivoRegistrar.almacenamiento = "";
    this.dispositivoRegistrar.ram = "";
    this.dispositivoRegistrar.tipoBateria = "";
    this.dispositivoRegistrar.capacidadBateria = "";
    this.dispositivoRegistrar.tipoProteccion = "";
    this.dispositivoRegistrar.lectorHuella = "";

    this.formularioRegistroDispositivo = this.formBuilder.group({
      marca: [this.dispositivoRegistrar.marca, Validators.required],
      modelo: [this.dispositivoRegistrar.modelo, Validators.required],
      precioCompra: [this.dispositivoRegistrar.precioCompra, Validators.required],
      precioVenta: [this.dispositivoRegistrar.precioVenta, Validators.required],
      cantidad: [this.dispositivoRegistrar.cantidad, Validators.required],
      tipoPantalla: [this.dispositivoRegistrar.tipoPantalla, Validators.required],
      resolucion: [this.dispositivoRegistrar.resolucion, Validators.required],
      camara: [this.dispositivoRegistrar.camara, Validators.required],
      procesador: [this.dispositivoRegistrar.procesador, Validators.required],
      almacenamiento: [this.dispositivoRegistrar.almacenamiento, Validators.required],
      ram: [this.dispositivoRegistrar.ram, Validators.required],
      tipoBateria: [this.dispositivoRegistrar.tipoBateria, Validators.required],
      capacidadBateria: [this.dispositivoRegistrar.capacidadBateria, Validators.required],
      tipoProteccion: [this.dispositivoRegistrar.tipoProteccion, Validators.required],
      huella: [this.dispositivoRegistrar.lectorHuella, Validators.required],
    })
  }
  get controlDispositivo() {
    return this.formularioRegistroDispositivo.controls;
  }
  onSubmitDispositivo() {
    if (this.formularioRegistroDispositivo.invalid) {
      return;
    }
    this.registrarDispositvo();
  }
  registrarDispositvo() {
    if (this.selectedFile != null) {
      this.dispositivoRegistrar = this.formularioRegistroDispositivo.value;
      this.dispositivoRegistrar.codigo = this.codigoDispositivo;
      this.dispositivoRegistrar.porcentajeIva = 0;
      this.dispositivoRegistrar.porcentajeIva = 0;
      this.dispositivoRegistrar.imagen = this.selectedFile;
      this.listaDispositivosCompra.unshift(this.dispositivoRegistrar);
      this.dispositivoRegistrar = new DispositivoMovil();
      this.dispositivoInexistente = false;
      this.codigoDispositivo = "";
      if (this.proveedorEncontrado.nit == undefined) {
        alert("Debe buscar un proveedor");
      } else {
        this.facturaCompraService.generarFactura(this.listaDispositivosCompra, this.proveedorEncontrado).subscribe(
          r => {
            this.facturaCompraGenerada = r;
          }
        )
      }
    }else{
      alert("Debe seleccionar una imagen");
    }

  }
  buscarDispositivo() {
    this.dispositivoService.buscar(this.codigoDispositivo).subscribe(
      r => {
        if (r != null) {
          this.dispositivoRegistrar = r;
          this.dispositivoInexistente = false;
        } else {
          this.dispositivoInexistente = true;
        }
      }
    )
  }
  buscarProveedor() {
    this.proveedorService.buscar(this.nitProveedorBuscar).subscribe(
      r => {
        if (r != null) {
          this.proveedorEncontrado = r;
        } else {
          alert("Proveedor inexistente");
        }
      }
    )
  }
  onPhotoSelected(event: { target: { files: File[]; }; }): void {
    if (event.target.files && event.target.files[0]) {
      this.imagen = <File>event.target.files[0];
      this.extraerBase64(this.imagen).then((r: any) => {
        this.selectedFile = r.base;
      })
    }
  }

  extraerBase64 = async ($event: any) => new Promise((resolve, reject) => {
    try {
      const unsafeImg = window.URL.createObjectURL($event);
      const image = this.sanitizer.bypassSecurityTrustUrl(unsafeImg);
      const reader = new FileReader();
      reader.readAsDataURL($event);
      reader.onload = () => {
        resolve({
          blob: $event,
          image,
          base: reader.result
        });
      };
      reader.onerror = error => {
        resolve({
          blob: $event,
          image,
          base: null
        });
      };

    } catch (e) {
      return null;
    }
  })

  proveedores() {
    this.proveedorService.todos().subscribe(
      r => {
        this.listaProveedores = r;
      }
    );
  }
  buildFormProveedor() {
    this.proveedorRegistrar = new Proveedor();
    this.proveedorRegistrar.nit = "";
    this.proveedorRegistrar.nombre = "";

    this.formularioRegistroProveedor = this.formBuilder.group({
      nit: [this.proveedorRegistrar.nit, Validators.required],
      nombre: [this.proveedorRegistrar.nombre, Validators.required]
    })
  }


  get controlProveedor() {
    return this.formularioRegistroProveedor.controls;
  }


  onSubmitProveedor() {
    if (this.formularioRegistroProveedor.invalid) {
      return;
    }
    this.registrarProveedor();
  }
  registrarProveedor() {
    this.proveedorRegistrar = this.formularioRegistroProveedor.value;
    this.proveedorService.buscar(this.proveedorRegistrar.nit).subscribe(
      r => {
        if (r == null) {
          this.proveedorService.registrar(this.proveedorRegistrar).subscribe(
            r => {
              if (r != null) {
                alert("Porveedor registrado correctamente.");
                this.proveedores();
              }
            }
          )
        } else {
          alert("Proveedor existente");
        }
      }
    )
  }

  actualizarCliente() {
    alert("Solo se actualizaran los campos en los que ingreso datos.");
    if (this.clienteActualizar.nombres.trim() != "" && this.clienteActualizar.nombres != undefined) {
      this.clienteConsuta.nombres = this.clienteActualizar.nombres
    }

    if (this.clienteActualizar.apellidos.trim() != "" && this.clienteActualizar.apellidos != undefined) {
      this.clienteConsuta.apellidos = this.clienteActualizar.apellidos
    }

    if (this.clienteActualizar.telefono.trim() != "" && this.clienteActualizar.telefono != undefined) {
      this.clienteConsuta.telefono = this.clienteActualizar.telefono
    }
    this.interesadoService.actualizar(this.clienteConsuta).subscribe(
      r => { alert("Datos actualizados"); }
    )
  }

  clientes() {
    this.interesadoService.todos().subscribe(
      r => {
        this.listaClientes = r;
      }
    );
  }

  verCliente(cliente: Interesado) {
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

    this.usuarioRegistrar = new Usuario();
    this.usuarioRegistrar.correo = "";
    this.usuarioRegistrar.contrasena = "";

    this.formularioRegistroInteresado = this.formBuilder.group({
      identificacion: [this.ClienteRegistrar.identificacion, Validators.required],
      nombres: [this.ClienteRegistrar.nombres, Validators.required],
      apellidos: [this.ClienteRegistrar.apellidos, Validators.required],
      telefono: [this.ClienteRegistrar.telefono, Validators.required],
      correo: [this.usuarioRegistrar.correo, Validators.required],
      contrasena: [this.usuarioRegistrar.contrasena, Validators.required]
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
    this.usuarioRegistrar = new Usuario();
    this.usuarioRegistrar.contrasena = this.formularioRegistroInteresado.value.contrasena;
    this.usuarioRegistrar.correo = this.formularioRegistroInteresado.value.correo;
    this.usuarioRegistrar.idPersona = this.ClienteRegistrar.identificacion;
    this.usuarioRegistrar.rol = "Interesado";
    this.interesadoService.buscar(this.ClienteRegistrar.identificacion).subscribe(
      r => {
        if (r == null) {
          this.usuarioService.buscar(this.usuarioRegistrar.correo).subscribe(
            r => {
              if (r == null) {
                this.interesadoService.registrar(this.ClienteRegistrar).subscribe(
                  r => {
                    if (r != null) {
                      this.usuarioService.Registrar(this.usuarioRegistrar).subscribe(
                        r => {
                          alert("Cliente registrado correctamente.");
                          this.clientes();
                        }
                      )
                    }
                  }
                )
              } else {
                alert("correo existente");
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
