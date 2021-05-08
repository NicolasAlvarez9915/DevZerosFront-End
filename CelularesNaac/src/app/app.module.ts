import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoginComponent } from './CelularesNaac/login/login.component';
import { JwtInterceptor } from './services/jwt.interceptor';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PerfilLiderAvaluosComponent } from './CelularesNaac/perfil-lider-avaluos/perfil-lider-avaluos.component';
import { BarraNavegacionComponent } from './barra-navegacion/barra-navegacion.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PerfilLiderAvaluosComponent,
    BarraNavegacionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },],
  bootstrap: [AppComponent]
})
export class AppModule { }
