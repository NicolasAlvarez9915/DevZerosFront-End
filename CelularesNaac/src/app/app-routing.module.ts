import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './CelularesNaac/login/login.component';
import { PerfilLiderAvaluosComponent } from './CelularesNaac/perfil-lider-avaluos/perfil-lider-avaluos.component';
import { RegistroComponent } from './CelularesNaac/registro/registro.component';
import { AuthGuard } from './services/auth.guard';

const routes: Routes = [
  { path: 'Login', component: LoginComponent},
  {path: 'Registro', component: RegistroComponent, canActivate: [AuthGuard]},
  {path: 'PerfilLiderAvaluos', component: PerfilLiderAvaluosComponent}
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
