import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { HandleHttpErrorService } from '../@base/handle-http-error.service';
import { DispositivoMovil } from '../CelularesNaac/models/dispositivo-movil';
import { FacturaCompra } from '../CelularesNaac/models/factura-compra';
import { Proveedor } from '../CelularesNaac/models/proveedor';
import { SolicitudFacturaCompra } from '../CelularesNaac/models/solicitud-factura-compra';

@Injectable({
  providedIn: 'root'
})
export class FacturaCompraService {
  baseUrl: string = "https://localhost:5001/";
  constructor(private http: HttpClient,private handleErrorService: HandleHttpErrorService) { }
  generarFactura(dispositivos: DispositivoMovil[], proveedor: Proveedor): Observable<FacturaCompra>{
    var solicitud: SolicitudFacturaCompra = new SolicitudFacturaCompra();
    solicitud.dispositivos = dispositivos;
    solicitud.proveedor = proveedor;
    
    return this.http.post<FacturaCompra>(this.baseUrl+'api/FacturaCompra/SolicitudFacturaCompra',solicitud)
    .pipe(
      tap(_ => this.handleErrorService.log('Encontrado')),
      catchError(this.handleErrorService.handleError<FacturaCompra>('Buscar Clientes', null))
    );
  }
  registrar(factura: FacturaCompra): Observable<FacturaCompra>{
    return this.http.post<FacturaCompra>(this.baseUrl+'api/FacturaCompra',factura)
    .pipe(
      tap(_ => this.handleErrorService.log('Encontrado')),
      catchError(this.handleErrorService.handleError<FacturaCompra>('Buscar Clientes', null))
    );
  }
}
