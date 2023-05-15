import { Component, OnInit } from '@angular/core';
import { PorfolioService } from 'src/app/servicios/porfolio.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
})
export class FooterComponent implements OnInit {
  persona: any;

  constructor(private porfolioService: PorfolioService) {}

  ngOnInit(): void {
    this.actualizarPersona();
  }

  actualizarPersona(): void {
    this.porfolioService.getPersona().subscribe((persona) => {
      this.persona = persona;
    });
  }
}
