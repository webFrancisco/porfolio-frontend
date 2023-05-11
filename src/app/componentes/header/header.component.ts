import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { VerificacionService } from 'src/app/servicios/verificacion.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  currentUser = { id: '' };
  estaVerificado = false;

  constructor(
    private verificacionService: VerificacionService,
    private ruta: Router
  ) {}

  ngOnInit(): void {
    this.actualizar();
  }

  logout() {
    this.verificacionService.SalirSesion();
    this.actualizar();
    window.location.reload();
  }

  actualizar() {
    this.currentUser = this.verificacionService.UsuarioVerificado;
    this.estaVerificado = Boolean(this.currentUser.id);
  }
}
