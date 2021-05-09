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
import { PerfilProfecionalVentasComponent } from './CelularesNaac/perfil-profecional-ventas/perfil-profecional-ventas.component';
import { PrincipalComponent } from './principal/principal.component';
import { RouterModule } from '@angular/router';
import { FooterComponent } from './footer/footer.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PerfilLiderAvaluosComponent,
    BarraNavegacionComponent,
    PerfilProfecionalVentasComponent,
    PrincipalComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
    { path: '', component: PrincipalComponent, pathMatch: 'full' }],
    { relativeLinkResolution: 'legacy' })
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },],
  bootstrap: [AppComponent]
})
export class AppModule { }
