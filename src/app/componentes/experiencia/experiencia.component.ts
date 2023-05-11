import { Component, OnInit } from '@angular/core';
// import { VerificacionService } from '../../servicios/verificacion.service';
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
  nuevaExperiencia: FormGroup;
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

  agregarExperiencia(event: Event): void {
    event.preventDefault;
    this.porfolioService
      .agregarExperiencia(this.nuevaExperiencia.value)
      .subscribe(() => {
        this.actualizarExperiencias();
        this.cerrarFormAgregarExperiencia();
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

  // --- GETTERS ---
  get nuevoOcupacion() {
    return this.nuevaExperiencia.get('ocupacion');
  }

  get nuevoLugarOcupacion() {
    return this.nuevaExperiencia.get('lugarOcupacion');
  }

  get nuevoFechaInicio() {
    return this.nuevaExperiencia.get('fechaInicio');
  }
  get nuevoFechaFin() {
    return this.nuevaExperiencia.get('fechaFin');
  }
  get nuevoDescripcion() {
    return this.nuevaExperiencia.get('descripcionOcupacion');
  }
}
