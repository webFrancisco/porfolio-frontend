import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PorfolioService } from 'src/app/servicios/porfolio.service';
import { VerificacionService } from 'src/app/servicios/verificacion.service';

@Component({
  selector: 'app-formacion',
  templateUrl: './formacion.component.html',
  styleUrls: ['./formacion.component.css'],
})
export class FormacionComponent {
  estaVerificado = false;
  agregandoFormacion: Boolean = false;
  modificandoFormacion: any = null;
  nuevaFormacion: FormGroup;
  modificaFormacion: FormGroup;
  formaciones: any;

  constructor(
    private porfolioService: PorfolioService,
    private formBuilder: FormBuilder,
    private verificacionService: VerificacionService
  ) {
    this.nuevaFormacion = this.formBuilder.group({
      formacion: ['', [Validators.required, Validators.minLength(3)]],
      lugarFormacion: ['', [Validators.required, Validators.minLength(3)]],
      fechaInicio: ['', [Validators.required]],
      fechaFin: [''],
      descripcionFormacion: [
        '',
        [Validators.required, Validators.minLength(3)],
      ],
    });
    this.modificaFormacion = this.formBuilder.group({
      formacion: ['', [Validators.required, Validators.minLength(3)]],
      lugarFormacion: ['', [Validators.required, Validators.minLength(3)]],
      fechaInicio: ['', [Validators.required]],
      fechaFin: [''],
      descripcionFormacion: [
        '',
        [Validators.required, Validators.minLength(3)],
      ],
    });
  }

  ngOnInit(): void {
    this.actualizarFormaciones();
    this.actualizar();
  }

  abrirFormAgregarFormacion(): void {
    this.agregandoFormacion = true;
  }

  cerrarFormAgregarFormacion(): void {
    this.agregandoFormacion = false;
  }

  abrirFormModificaFormacion(id: number): void {
    this.modificandoFormacion = id;
  }

  cerrarFormModificaFormacion(): void {
    this.modificandoFormacion = null;
  }

  agregarFormacion(event: Event): void {
    event.preventDefault;
    this.porfolioService
      .agregarFormacion(this.nuevaFormacion.value)
      .subscribe(() => {
        this.actualizarFormaciones();
        this.cerrarFormAgregarFormacion();
      });
  }

  modificarFormacion(event: Event): void {
    event.preventDefault;
    this.porfolioService
      .modificarFormacion(
        this.modificandoFormacion,
        this.modificaFormacion.value
      )
      .subscribe(() => {
        this.actualizarFormaciones();
        this.cerrarFormModificaFormacion();
      });
  }

  eliminarFormacion(id: number): void {
    this.porfolioService.eliminarFormacion(id).subscribe(() => {
      this.actualizarFormaciones();
    });
  }

  actualizarFormaciones(): void {
    this.porfolioService.getFormaciones().subscribe((formaciones) => {
      this.formaciones = formaciones;
    });
  }

  actualizar() {
    this.estaVerificado = Boolean(
      this.verificacionService.UsuarioVerificado.id
    );
  }

  setFormacionValues(formacion: any) {
    this.modificaFormacion.patchValue({
      formacion: formacion.formacion,
      lugarFormacion: formacion.lugarFormacion,
      fechaInicio: formacion.fechaInicio,
      fechaFin: formacion.fechaFin,
      descripcionFormacion: formacion.descripcionFormacion,
    });
  }

  // --- GETTERS ---
  campoNuevaFor(campo: String) {
    return this.nuevaFormacion.get(`${campo}`);
  }

  campoModificarFor(campo: String) {
    return this.modificaFormacion.get(`${campo}`);
  }
}
