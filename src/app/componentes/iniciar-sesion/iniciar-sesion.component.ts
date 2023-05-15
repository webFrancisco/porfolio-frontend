import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { VerificacionService } from '../../servicios/verificacion.service';
import { Router } from '@angular/router';
import { catchError, of } from 'rxjs';

@Component({
  selector: 'app-iniciar-sesion',
  templateUrl: './iniciar-sesion.component.html',
  styleUrls: ['./iniciar-sesion.component.css'],
})
export class IniciarSesionComponent implements OnInit {
  form: FormGroup;
  errorMessage: string | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private verificacionService: VerificacionService,
    private ruta: Router
  ) {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  ngOnInit(): void {}

  get Email() {
    return this.form.get('email');
  }

  get Password() {
    return this.form.get('password');
  }

  onEnviar(event: Event) {
    event.preventDefault;
    this.verificacionService
      .IniciarSesion(this.form.value)
      .pipe(
        catchError((error) => {
          console.log(error);
          if (error.status === 401) {
            this.errorMessage = 'Email o Contraseña incorrectos';
          } else {
            this.errorMessage = 'Ups, ha ocurrido un error';
          }
          return of(null);
        })
      )
      .subscribe((data) => {
        if (data) {
          console.log('onEnviarSubscribe');
          console.log(data);
          this.ruta.navigate(['/']);
        }
      });
  }
}
