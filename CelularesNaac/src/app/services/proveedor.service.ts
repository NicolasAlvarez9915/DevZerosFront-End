import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { HandleHttpErrorService } from '../@base/handle-http-error.service';
import { Proveedor } from '../CelularesNaac/models/proveedor';

@Injectable({
  providedIn: 'root'
})
export class ProveedorService {
  baseUrl: string = "https://localhost:5001/";
  constructor(private http: HttpClient,private handleErrorService: HandleHttpErrorService) { }

  buscar(nit: string): Observable<Proveedor>{
    return this.http.get<Proveedor>(this.baseUrl+'api/Proveedor/'+nit)
    .pipe(
      tap(_ => this.handleErrorService.log('Encontrado')),
      catchError(this.handleErrorService.handleError<Proveedor>('Buscar Clientes', null))
    );
  }

  registrar(proveedor: Proveedor): Observable<Proveedor>{
    return this.http.post<Proveedor>(this.baseUrl+'api/Proveedor',proveedor)
    .pipe(
      tap(_ => this.handleErrorService.log('Encontrado')),
      catchError(this.handleErrorService.handleError<Proveedor>('Buscar Clientes', null))
    );
  }

  todos(): Observable<Proveedor[]>{
    return this.http.get<Proveedor[]>(this.baseUrl+'api/Proveedor')
    .pipe(
      tap(_ => this.handleErrorService.log('Encontrado')),
      catchError(this.handleErrorService.handleError<Proveedor[]>('Buscar Clientes', null))
    );
  }
}
