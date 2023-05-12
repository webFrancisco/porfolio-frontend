import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PorfolioService } from 'src/app/servicios/porfolio.service';
import { VerificacionService } from 'src/app/servicios/verificacion.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css'],
})
export class InicioComponent implements OnInit {
  estaVerificado = false;
  modificandoPersona: Boolean = false;
  modificaPersona: FormGroup;
  persona: any;

  constructor(
    private porfolioService: PorfolioService,
    private formBuilder: FormBuilder,
    private verificacionService: VerificacionService
  ) {
    this.modificaPersona = this.formBuilder.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      apellido: ['', [Validators.required, Validators.minLength(3)]],
      acercaDe: ['', [Validators.required, Validators.minLength(3)]],
      enlaceGithub: ['', [Validators.required, Validators.minLength(3)]],
      enlaceLinkedin: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.minLength(3)]],
      titulo: ['', [Validators.required, Validators.minLength(3)]],
    });
  }

  ngOnInit(): void {
    this.actualizarPersona();
    this.actualizar();
  }

  abrirFormModificaPersona(): void {
    this.modificandoPersona = true;
  }

  cerrarFormModificaPersona(): void {
    this.modificandoPersona = false;
  }

  actualizarPersona(): void {
    this.porfolioService.getPersona().subscribe((persona) => {
      this.persona = persona;
    });
  }

  modificarPersona(event: Event): void {
    event.preventDefault;
    this.porfolioService
      .modificarPersona(this.modificaPersona.value)
      .subscribe(() => {
        this.actualizarPersona();
        this.cerrarFormModificaPersona();
      });
  }

  actualizar() {
    this.estaVerificado = Boolean(
      this.verificacionService.UsuarioVerificado.id
    );
  }

  setPersonaValues() {
    this.modificaPersona.patchValue({
      nombre: this.persona.nombre,
      apellido: this.persona.apellido,
      acercaDe: this.persona.acercaDe,
      email: this.persona.email,
      enlaceGithub: this.persona.enlaceGithub,
      enlaceLinkedin: this.persona.enlaceLinkedin,
      titulo: this.persona.titulo,
    });
  }

  campoModificarPer(campo: String) {
    return this.modificaPersona.get(`${campo}`);
  }
}
