import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Usuario } from '../models/usuario';
import { UsuarioSession } from '../models/usuario-session';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  usuario: UsuarioSession;
  returnUrl: String;

  formularioinicioSesion: FormGroup

  constructor(private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService
  ) {
    // redirect to home if already logged in
    if (this.authenticationService.currentUserValue) {
      this.router.navigate(['/']);
    }
  }


  ngOnInit() {
    this.buildForm();
    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  private buildForm() {
    this.usuario = new UsuarioSession();
    this.usuario.contrasena = '';
    this.usuario.correo = '';
    this.formularioinicioSesion = this.formBuilder.group({
      contrasena: [this.usuario.contrasena, Validators.required],
      correo: [this.usuario.correo, Validators.required]
    });
  }

  get control() {
    return this.formularioinicioSesion.controls;
  }

  onSubmit() {
    if (this.formularioinicioSesion.invalid) {
      return;
    }
    this.iniciarSession();
  }

  iniciarSession() {
    this.usuario = this.formularioinicioSesion.value;
    this.authenticationService.login(this.usuario).pipe(first())
    .subscribe(
      data => {
        this.authenticationService.currentUser.subscribe(x => {
          if(x != null){
            this.router.navigate(['/PerfilLiderAvaluos']);
            /*if (x.rol == "LiderAvaluos") {
              this.router.navigate(['/PerfilLiderAvaluos']);
            } else {
              //this.router.navigate(['/PerfilCliente']);
            }*/
          }
        });
      },
      error => {
        alert("Datos incorrectos");
      });
  }
}
