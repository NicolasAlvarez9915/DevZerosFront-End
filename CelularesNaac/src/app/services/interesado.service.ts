import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { HandleHttpErrorService } from '../@base/handle-http-error.service';
import { Interesado } from '../CelularesNaac/models/interesado';

@Injectable({
  providedIn: 'root'
})
export class InteresadoService {
  baseUrl: string = "https://localhost:5001/";
  constructor(private http: HttpClient,private handleErrorService: HandleHttpErrorService) { }

  buscar(identificacion: string): Observable<Interesado>{
    return this.http.get<Interesado>(this.baseUrl+'api/Interesado/'+identificacion)
    .pipe(
      tap(_ => this.handleErrorService.log('Encontrado')),
      catchError(this.handleErrorService.handleError<Interesado>('Buscar Clientes', null))
    );
  }

  registrar(interesado: Interesado): Observable<Interesado>{
    return this.http.post<Interesado>(this.baseUrl+'api/Interesado',interesado)
    .pipe(
      tap(_ => this.handleErrorService.log('Encontrado')),
      catchError(this.handleErrorService.handleError<Interesado>('Buscar Clientes', null))
    );
  }

  actualizar(interesado: Interesado): Observable<Interesado>{
    return this.http.put<Interesado>(this.baseUrl+'api/Interesado/Actualizar',interesado)
    .pipe(
      tap(_ => this.handleErrorService.log('Encontrado')),
      catchError(this.handleErrorService.handleError<Interesado>('Buscar Clientes', null))
    );
  }

  todos(): Observable<Interesado[]>{
    return this.http.get<Interesado[]>(this.baseUrl+'api/Interesado')
    .pipe(
      tap(_ => this.handleErrorService.log('Encontrado')),
      catchError(this.handleErrorService.handleError<Interesado[]>('Buscar Clientes', null))
    );
  }
}
