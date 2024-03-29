import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class PorfolioService {
  private apiUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) {}

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
    return this.http.put<any>(
      `${this.apiUrl}/personas/1/formacion/${id}`,
      formacion
    );
  }

  // --- LLAMADAS HABILIDADES ---
  getHabilidades(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/personas/1/habilidades`);
  }

  agregarHabilidad(habilidad: any): Observable<any> {
    return this.http.post<any>(
      `${this.apiUrl}/personas/1/habilidad`,
      habilidad
    );
  }

  eliminarHabilidad(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/personas/1/habilidad/${id}`);
  }

  modificarHabilidad(id: number, habilidad: any): Observable<any> {
    return this.http.put<any>(
      `${this.apiUrl}/personas/1/habilidad/${id}`,
      habilidad
    );
  }

  // --- LLAMADAS PROYECTOS ---
  getProyectos(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/personas/1/proyectos`);
  }

  agregarProyecto(proyecto: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/personas/1/proyecto`, proyecto);
  }

  eliminarProyecto(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/personas/1/proyecto/${id}`);
  }

  modificarProyecto(id: number, proyecto: any): Observable<any> {
    return this.http.put<any>(
      `${this.apiUrl}/personas/1/proyecto/${id}`,
      proyecto
    );
  }
}
