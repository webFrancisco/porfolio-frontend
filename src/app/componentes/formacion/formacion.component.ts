import { Component, OnInit } from '@angular/core';
import { PorfolioService } from 'src/app/servicios/porfolio.service';

@Component({
  selector: 'app-formacion',
  templateUrl: './formacion.component.html',
  styleUrls: ['./formacion.component.css']
})
export class FormacionComponent {
dataFormacion: any;
constructor(private datosporfolio: PorfolioService) {}
ngOnInit(): void {
  this.datosporfolio.obtenerDatos().subscribe((data) => {
    console.log('llamar servicio desde Formacion');
    this.dataFormacion = data?.formacion.carrerasDeGrado;
  });
}
}
