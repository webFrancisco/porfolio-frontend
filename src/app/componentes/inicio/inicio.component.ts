import { Component, OnInit } from '@angular/core';
import { PorfolioService } from 'src/app/servicios/porfolio.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css'],
})
export class InicioComponent implements OnInit {
  datosdeinicio: any;
  constructor(private datosporfolio: PorfolioService) {}
  ngOnInit(): void {
    this.datosporfolio.obtenerDatos().subscribe((data) => {
      console.log('llamar servicio desde Inicio');
      this.datosdeinicio = data?.Inicio;
    });
  }
}
