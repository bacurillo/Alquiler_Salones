import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs';
import { Categoria } from '../modelo/categoria';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

 private url: string = 'http://localhost:9999/categoria'
//  private url: string = 'http://147.182.165.168:9999/categoria'

  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' })


  constructor(private http: HttpClient) { }

  getCategoria(): Observable<Categoria[]> {
    return this.http.get<Categoria[]>(this.url + "/listar");
  }

  crearCategoria(categoria: Categoria): Observable<Categoria> {
    return this.http.post<Categoria>(this.url + "/crear", categoria, { headers: this.httpHeaders })
  }
}