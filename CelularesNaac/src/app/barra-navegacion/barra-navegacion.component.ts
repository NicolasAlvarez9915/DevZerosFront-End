import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from '../CelularesNaac/models/usuario';
import { UsuarioSession } from '../CelularesNaac/models/usuario-session';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-barra-navegacion',
  templateUrl: './barra-navegacion.component.html',
  styleUrls: ['./barra-navegacion.component.css']
})
export class BarraNavegacionComponent implements OnInit {
  currentUser: Usuario;
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
  }


  ngOnInit(): void {
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/Login']);
  }
  RedirigirPerfil() {
    if (this.currentUser == null) {
      this.router.navigate(['/Login']);
    } else {
      if (this.currentUser.rol == "Lider Avaluos") {
        this.router.navigate(['/PerfilLiderAvaluos']);
      } else {
        if (this.currentUser.rol == "Profecional Ventas") {
          this.router.navigate(['/PerfilProfecionalVentas']);
        } else {
          this.router.navigate(['']);
        }
      }
    }
  }
}
