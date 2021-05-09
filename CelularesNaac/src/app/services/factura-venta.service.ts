import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { HandleHttpErrorService } from '../@base/handle-http-error.service';
import { DispositivoMovil } from '../CelularesNaac/models/dispositivo-movil';
import { FacturaVenta } from '../CelularesNaac/models/factura-venta';
import { Interesado } from '../CelularesNaac/models/interesado';
import { SolicitudFacturaVenta } from '../CelularesNaac/models/solicitud-factura-venta';

@Injectable({
  providedIn: 'root'
})
export class FacturaVentaService {
  baseUrl: string = "https://localhost:5001/";
  constructor(private http: HttpClient,private handleErrorService: HandleHttpErrorService) { }

  generarFactura(dispositivos: DispositivoMovil[], interesado: Interesado): Observable<FacturaVenta>{
    var solicitud: SolicitudFacturaVenta = new SolicitudFacturaVenta();
    solicitud.dispositivos = dispositivos;
    solicitud.interesado = interesado;
    return this.http.post<FacturaVenta>(this.baseUrl+'api/FacturaVenta/SolicitudFacturaVenta',solicitud)
    .pipe(
      tap(_ => this.handleErrorService.log('Encontrado')),
      catchError(this.handleErrorService.handleError<FacturaVenta>('Buscar Clientes', null))
    );
  }
  
  registrar(factura: FacturaVenta): Observable<FacturaVenta>{
    return this.http.post<FacturaVenta>(this.baseUrl+'api/FacturaVenta',factura)
    .pipe(
      tap(_ => this.handleErrorService.log('Encontrado')),
      catchError(this.handleErrorService.handleError<FacturaVenta>('Buscar Clientes', null))
    );
  }
}
