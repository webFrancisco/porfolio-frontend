import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class VerificacionService {
  url = 'http://localhost:8080/personas/1/verificarpass';

  constructor(private http: HttpClient) {
    console.log('Servicio autenticacion corriendo...');
  }

  IniciarSesion(credenciales: any): Observable<any> {
    return this.http.post(this.url, credenciales).pipe(
      map((data) => {
        sessionStorage.setItem('currentUser', JSON.stringify(data));
        return data;
      })
    );
  }

  SalirSesion() {
    sessionStorage.setItem('currentUser', '');
  }

  get UsuarioVerificado() {
    return JSON.parse(sessionStorage.getItem('currentUser') || '{}');
  }
}
