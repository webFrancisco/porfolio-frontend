import { Component, OnInit } from '@angular/core';
import { PorfolioService } from '../../servicios/porfolio.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { VerificacionService } from 'src/app/servicios/verificacion.service';

@Component({
  selector: 'app-experiencia',
  templateUrl: './experiencia.component.html',
  styleUrls: ['./experiencia.component.css'],
})
export class ExperienciaComponent implements OnInit {
  estaVerificado = false;
  agregandoExperiencia: Boolean = false;
  modificandoExperiencia: any = null;
  nuevaExperiencia: FormGroup;
  modificaExperiencia: FormGroup;
  experiencias: any;

  constructor(
    private porfolioService: PorfolioService,
    private formBuilder: FormBuilder,
    private verificacionService: VerificacionService
  ) {
    this.nuevaExperiencia = this.formBuilder.group({
      ocupacion: ['', [Validators.required, Validators.minLength(3)]],
      lugarOcupacion: ['', [Validators.required, Validators.minLength(3)]],
      fechaInicio: ['', [Validators.required]],
      fechaFin: [''],
      descripcionOcupacion: [
        '',
        [Validators.required, Validators.minLength(3)],
      ],
    });
    this.modificaExperiencia = this.formBuilder.group({
      ocupacion: ['', [Validators.required, Validators.minLength(3)]],
      lugarOcupacion: ['', [Validators.required, Validators.minLength(3)]],
      fechaInicio: ['', [Validators.required]],
      fechaFin: [''],
      descripcionOcupacion: [
        '',
        [Validators.required, Validators.minLength(3)],
      ],
    });
  }

  ngOnInit(): void {
    this.actualizarExperiencias();
    console.log(this.experiencias);
    this.actualizar();
  }

  abrirFormAgregarExperiencia(): void {
    this.agregandoExperiencia = true;
  }

  cerrarFormAgregarExperiencia(): void {
    this.agregandoExperiencia = false;
  }

  abrirFormModificaExperiencia(id: number): void {
    this.modificandoExperiencia = id;
  }

  cerrarFormModificaExperiencia(): void {
    this.modificandoExperiencia = null;
  }

  agregarExperiencia(event: Event): void {
    event.preventDefault;
    this.porfolioService
      .agregarExperiencia(this.nuevaExperiencia.value)
      .subscribe(() => {
        this.actualizarExperiencias();
        this.cerrarFormAgregarExperiencia();
      });
  }

  modificarExperiencia(event: Event): void {
    event.preventDefault;
    console.log(this.modificaExperiencia);
    this.porfolioService
      .modificarExperiencia(
        this.modificandoExperiencia,
        this.modificaExperiencia.value
      )
      .subscribe(() => {
        this.actualizarExperiencias();
        this.cerrarFormModificaExperiencia();
      });
  }

  eliminarExperiencia(id: number): void {
    this.porfolioService.eliminarExperiencia(id).subscribe(() => {
      this.actualizarExperiencias();
    });
  }

  actualizarExperiencias(): void {
    this.porfolioService.getExperiencias().subscribe((experiencias) => {
      console.log(experiencias);
      this.experiencias = experiencias;
    });
  }

  actualizar() {
    this.estaVerificado = Boolean(
      this.verificacionService.UsuarioVerificado.id
    );
  }

  setExperienciaValues(experiencia: any) {
    this.modificaExperiencia.patchValue({
      ocupacion: experiencia.ocupacion,
      lugarOcupacion: experiencia.lugarOcupacion,
      fechaInicio: experiencia.fechaInicio,
      fechaFin: experiencia.fechaFin,
      descripcionOcupacion: experiencia.descripcionOcupacion,
    });
  }

  // --- GETTERS ---
  campoNuevaExp(campo: String) {
    return this.nuevaExperiencia.get(`${campo}`);
  }

  campoModificarExp(campo: String) {
    return this.modificaExperiencia.get(`${campo}`);
  }
}
