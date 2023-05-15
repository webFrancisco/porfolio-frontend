import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PorfolioService } from 'src/app/servicios/porfolio.service';
import { VerificacionService } from 'src/app/servicios/verificacion.service';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.css'],
})
export class SkillsComponent implements OnInit {
  estaVerificado = false;
  agregandoHabilidad: Boolean = false;
  modificandoHabilidad: any = null;
  nuevaHabilidad: FormGroup;
  modificaHabilidad: FormGroup;
  habilidades: any;

  constructor(
    private porfolioService: PorfolioService,
    private formBuilder: FormBuilder,
    private verificacionService: VerificacionService
  ) {
    this.nuevaHabilidad = this.formBuilder.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      nivel: [
        '',
        [Validators.required, Validators.min(1), Validators.max(100)],
      ],
    });
    this.modificaHabilidad = this.formBuilder.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      nivel: [
        '',
        [Validators.required, Validators.min(1), Validators.max(100)],
      ],
    });
  }

  ngOnInit(): void {
    this.actualizarHabilidades();
    this.actualizar();
  }

  abrirFormAgregarHabilidad(): void {
    this.agregandoHabilidad = true;
  }

  cerrarFormAgregarHabilidad(): void {
    this.agregandoHabilidad = false;
  }

  abrirFormModificaHabilidad(id: number): void {
    this.modificandoHabilidad = id;
  }

  cerrarFormModificaHabilidad(): void {
    this.modificandoHabilidad = null;
  }

  agregarHabilidad(event: Event): void {
    event.preventDefault;
    this.porfolioService
      .agregarHabilidad(this.nuevaHabilidad.value)
      .subscribe(() => {
        this.actualizarHabilidades();
        this.cerrarFormAgregarHabilidad();
      });
  }

  modificarHabilidad(event: Event): void {
    event.preventDefault;
    this.porfolioService
      .modificarHabilidad(
        this.modificandoHabilidad,
        this.modificaHabilidad.value
      )
      .subscribe(() => {
        this.actualizarHabilidades();
        this.cerrarFormModificaHabilidad();
      });
  }

  eliminarHabilidad(id: number): void {
    this.porfolioService.eliminarHabilidad(id).subscribe(() => {
      this.actualizarHabilidades();
    });
  }

  actualizarHabilidades(): void {
    this.porfolioService.getHabilidades().subscribe((habilidades) => {
      this.habilidades = habilidades;
    });
  }

  actualizar() {
    this.estaVerificado = Boolean(
      this.verificacionService.UsuarioVerificado.id
    );
  }

  setHabilidadValues(habilidad: any) {
    console.log(habilidad);
    this.modificaHabilidad.patchValue({
      nombre: habilidad.nombre,
      nivel: habilidad.nivel,
    });
  }

  // --- GETTERS ---
  campoNuevaHab(campo: String) {
    return this.nuevaHabilidad.get(`${campo}`);
  }

  campoModificarHab(campo: String) {
    return this.modificaHabilidad.get(`${campo}`);
  }
}
