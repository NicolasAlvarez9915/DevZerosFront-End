import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './CelularesNaac/login/login.component';
import { RegistroComponent } from './CelularesNaac/registro/registro.component';
import { AuthGuard } from './services/auth.guard';

const routes: Routes = [
  { path: 'Login', component: LoginComponent},
  {path: 'Registro', component: RegistroComponent, canActivate: [AuthGuard]}

]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
