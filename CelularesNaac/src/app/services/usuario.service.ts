import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { tap, catchError } from 'rxjs/operators';
import { HandleHttpErrorService } from '../@base/handle-http-error.service';
import { Usuario } from '../CelularesNaac/models/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  baseUrl: string = "https://localhost:5001/";
  constructor(private http: HttpClient,private handleErrorService: HandleHttpErrorService) { }


  Registrar(usuario: Usuario): Observable<Usuario>
  {
    return this.http.post<Usuario>(this.baseUrl+'api/Usuario',usuario)
    .pipe(
      tap(_ => this.handleErrorService.log('Encontrado')),
      catchError(this.handleErrorService.handleError<Usuario>('Buscar Clientes', null))
    );
  }

  buscar(correo: string): Observable<Usuario>{
    return this.http.get<Usuario>(this.baseUrl+'api/Usuario/'+correo)
    .pipe(
      tap(_ => this.handleErrorService.log('Encontrado')),
      catchError(this.handleErrorService.handleError<Usuario>('Buscar Clientes', null))
    );
  }
}
