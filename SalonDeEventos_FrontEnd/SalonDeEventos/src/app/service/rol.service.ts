import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable, map, of } from 'rxjs';
import { Rol } from '../modelo/rol';

@Injectable({
  providedIn: 'root'
})
export class RolService {

  private url: string = 'http://localhost:9999/rol'
  // private url: string = 'http://147.182.165.168:9999/rol'

  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' })

  constructor(private http: HttpClient) { }

  getRol(id: number): Observable<Rol> {
    return this.http.get<Rol>(`${this.url}/rolId/${id}`);
  }

  getRoles(): Observable<Rol[]> {
    return this.http.get(this.url + "/listar").pipe(map(response => response as Rol[]));
  }
  // update(id: number, rol: Rol): Observable<Rol> {
  //   return this.http.put<Rol>(`${this.url}/actualizar/${id}`, rol);
  // }
}
