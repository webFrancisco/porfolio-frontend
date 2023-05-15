import { Component, OnInit } from '@angular/core';
import { PorfolioService } from '../../servicios/porfolio.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { VerificacionService } from 'src/app/servicios/verificacion.service';

@Component({
  selector: 'app-proyectos',
  templateUrl: './proyectos.component.html',
  styleUrls: ['./proyectos.component.css'],
})
export class ProyectosComponent implements OnInit {
  estaVerificado = false;
  agregandoProyecto: Boolean = false;
  modificandoProyecto: any = null;
  nuevoProyecto: FormGroup;
  modificaProyecto: FormGroup;
  proyectos: any;

  constructor(
    private porfolioService: PorfolioService,
    private formBuilder: FormBuilder,
    private verificacionService: VerificacionService
  ) {
    this.nuevoProyecto = this.formBuilder.group({
      titulo: ['', [Validators.required, Validators.minLength(3)]],
      destino: ['', [Validators.required, Validators.minLength(3)]],
      fechaInicio: ['', [Validators.required]],
      fechaFin: [''],
      descripcion: ['', [Validators.required, Validators.minLength(3)]],
    });
    this.modificaProyecto = this.formBuilder.group({
      titulo: ['', [Validators.required, Validators.minLength(3)]],
      destino: ['', [Validators.required, Validators.minLength(3)]],
      fechaInicio: ['', [Validators.required]],
      fechaFin: [''],
      descripcion: ['', [Validators.required, Validators.minLength(3)]],
    });
  }

  ngOnInit(): void {
    this.actualizarProyectos();
    this.actualizar();
  }

  abrirFormAgregarProyecto(): void {
    this.agregandoProyecto = true;
  }

  cerrarFormAgregarProyecto(): void {
    this.agregandoProyecto = false;
  }

  abrirFormModificaProyecto(id: number): void {
    this.modificandoProyecto = id;
  }

  cerrarFormModificaProyecto(): void {
    this.modificandoProyecto = null;
  }

  agregarProyecto(event: Event): void {
    event.preventDefault;
    this.porfolioService
      .agregarProyecto(this.nuevoProyecto.value)
      .subscribe(() => {
        this.actualizarProyectos();
        this.cerrarFormAgregarProyecto();
      });
  }

  modificarProyecto(event: Event): void {
    event.preventDefault;
    this.porfolioService
      .modificarProyecto(this.modificandoProyecto, this.modificaProyecto.value)
      .subscribe(() => {
        this.actualizarProyectos();
        this.cerrarFormModificaProyecto();
      });
  }

  eliminarProyecto(id: number): void {
    this.porfolioService.eliminarProyecto(id).subscribe(() => {
      this.actualizarProyectos();
    });
  }

  actualizarProyectos(): void {
    this.porfolioService.getProyectos().subscribe((proyectos) => {
      this.proyectos = proyectos;
    });
  }

  actualizar() {
    this.estaVerificado = Boolean(
      this.verificacionService.UsuarioVerificado.id
    );
  }

  setProyectoValues(proyecto: any) {
    this.modificaProyecto.patchValue({
      titulo: proyecto.titulo,
      destino: proyecto.destino,
      fechaInicio: proyecto.fechaInicio,
      fechaFin: proyecto.fechaFin,
      descripcion: proyecto.descripcion,
    });
  }

  // --- GETTERS ---
  campoNuevoPro(campo: String) {
    return this.nuevoProyecto.get(`${campo}`);
  }

  campoModificarPro(campo: String) {
    return this.modificaProyecto.get(`${campo}`);
  }
}
