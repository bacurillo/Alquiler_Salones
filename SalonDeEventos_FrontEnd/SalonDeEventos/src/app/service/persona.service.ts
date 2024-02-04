import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable, map, of } from 'rxjs';
import { Persona } from '../modelo/persona';
import { ListausuariosComponent } from '../listausuarios/listausuarios.component';
import { PERSONAS } from '../listausuarios/listausuarios.json';

@Injectable({
  providedIn: 'root'
})
export class PersonaService {

  private url: string = 'http://localhost:9999/persona'
  // private url: string = 'http://147.182.165.168:9999/persona'

  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' })


  constructor(private http: HttpClient) { }

  // crearPersona(persona: Persona): Observable<Persona> {
  //   return this.http.post<Persona>(this.url + "http://localhost:9999/persona/crear", persona, { headers: this.httpHeaders })
  // }

  crearPersona(persona: Persona): Observable<Persona> {
    return this.http.post<Persona>(`${this.url}/crear`, persona, { headers: this.httpHeaders })
  }

  getId(): Observable<number> {
    return this.http.get<number>(this.url + "/ultimoregistro");
  }

  getPersonas(): Observable<Persona[]> {
    return this.http.get(this.url + "/listar").pipe(map(response => response as Persona[]));
  }

  update(id: number, persona: Persona): Observable<Persona> {
    return this.http.put<Persona>(`${this.url}/actualizar/${id}`, persona);
  }

  cedulaRegistra(cedula: string): Observable<boolean> {
    return this.http.get<boolean>(`${this.url}/cedulaRegistra/${cedula}`);
  }
}
