import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable, map, of } from 'rxjs';
import { Usuario } from '../modelo/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
 private url: string = 'http://localhost:9999/usuario'
//  private url: string = 'http://147.182.165.168:9999/usuario'

  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' })

  constructor(private http: HttpClient) { }

  crearUsuario(usuario: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>(this.url + "/crear", usuario, { headers: this.httpHeaders })
  }

  usuarioExiste(usuario: string): Observable<boolean> {
    return this.http.get<boolean>(`${this.url}/usuarioExiste/${usuario}`);
  }

  login(usuario: string, password: string): Observable<Usuario> {
    return this.http.get<Usuario>(`${this.url}/login/${usuario}/${password}`);
  }

  buscarUsu(id: number): Observable<Usuario> {
    return this.http.get<Usuario>(`${this.url}/buscar/${id}`);
  }

  getUsuarios(): Observable<Usuario[]> {
    return this.http.get(this.url + "/listar").pipe(map(response => response as Usuario[]));
  }

  listarEst(est: number): Observable<Usuario[]> {
    return this.http.get(`${this.url}/listar/${est}`).pipe(map(response => response as Usuario[]));
}

  buscarUsuarios(busqueda: string, est: number): Observable<Usuario[]> {
    console.log(`${this.url}/busqueda/${busqueda}/${est}`)
    return this.http.get(`${this.url}/busqueda/${busqueda}/${est}`).pipe(map(response => response as Usuario[]));
  }

  update(id: number, usuario: Usuario): Observable<Usuario> {
    return this.http.put<Usuario>(`${this.url}/actualizar/${id}`, usuario);
  }

  actualizarEst(id: number, estado: number): Observable<Usuario> {
    return this.http.put<Usuario>(`${this.url}/actualizarEst/${id}/${estado}`, null);
  }
}
