import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class PorfolioService {
  private apiUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) {}

  obtenerDatos(): Observable<any> {
    console.log('servicio funcionando');
    return this.http.get('./assets/data.json');
  }

  // --- LLAMADAS PERSONA ---
  getPersona(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/personas/1`);
  }

  modificarPersona(persona: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/personas/1`, persona);
  }

  // --- LLAMADAS EXPERIENCIA ---
  getExperiencias(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/personas/1/experiencias`);
  }

  agregarExperiencia(experiencia: any): Observable<any> {
    return this.http.post<any>(
      `${this.apiUrl}/personas/1/experiencia`,
      experiencia
    );
  }

  eliminarExperiencia(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/personas/1/experiencia/${id}`);
  }

  modificarExperiencia(id: number, experiencia: any): Observable<any> {
    console.log(id);
    console.log(experiencia);
    return this.http.put<any>(
      `${this.apiUrl}/personas/1/experiencia/${id}`,
      experiencia
    );
  }

  // --- LLAMADAS FORMACION ---
  getFormaciones(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/personas/1/formaciones`);
  }

  agregarFormacion(formacion: any): Observable<any> {
    return this.http.post<any>(
      `${this.apiUrl}/personas/1/formacion`,
      formacion
    );
  }

  eliminarFormacion(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/personas/1/formacion/${id}`);
  }

  modificarFormacion(id: number, formacion: any): Observable<any> {
    console.log(id);
    console.log(formacion);
    return this.http.put<any>(
      `${this.apiUrl}/personas/1/formacion/${id}`,
      formacion
    );
  }
}
