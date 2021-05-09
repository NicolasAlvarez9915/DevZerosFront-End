import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { HandleHttpErrorService } from '../@base/handle-http-error.service';
import { DispositivoMovil } from '../CelularesNaac/models/dispositivo-movil';

@Injectable({
  providedIn: 'root'
})
export class DispositivoMovilService {
  baseUrl: string = "https://localhost:5001/";
  constructor(private http: HttpClient,private handleErrorService: HandleHttpErrorService) { }

  buscar(codigo: string): Observable<DispositivoMovil>{
    return this.http.get<DispositivoMovil>(this.baseUrl+'api/DispositivoMovil/'+codigo)
    .pipe(
      tap(_ => this.handleErrorService.log('Encontrado')),
      catchError(this.handleErrorService.handleError<DispositivoMovil>('Buscar Clientes', null))
    );
  }

  registrar(dispositivos: DispositivoMovil[]): Observable<DispositivoMovil>{
    return this.http.post<DispositivoMovil>(this.baseUrl+'api/DispositivoMovil',dispositivos)
    .pipe(
      tap(_ => this.handleErrorService.log('Encontrado')),
      catchError(this.handleErrorService.handleError<DispositivoMovil>('Buscar Clientes', null))
    );
  }
}
