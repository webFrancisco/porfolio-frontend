import { Component, OnInit } from '@angular/core';
import { VerificacionService } from 'src/app/servicios/verificacion.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  currentUser = { id: '' };
  estaVerificado = false;

  constructor(private verificacionService: VerificacionService) {}

  ngOnInit(): void {
    this.currentUser = this.verificacionService.UsuarioVerificado;

    this.estaVerificado = Boolean(this.currentUser.id);
  }

  logout() {
    this.verificacionService.SalirSesion();
    this.estaVerificado = false;
  }
}
