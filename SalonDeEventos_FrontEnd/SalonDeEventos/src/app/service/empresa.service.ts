import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs';
import { Empresa } from '../modelo/empresa';

@Injectable({
  providedIn: 'root'
})
export class EmpresaService {

  private url: string = 'http://localhost:9999/empresa'
  // private url: string = 'http://147.182.165.168:9999/empresa'

  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' })

  constructor(private http: HttpClient) { }


  //recuperar categorias activas o inactivas
  getEmpresaPorId(id: number): Observable<Empresa> {
    return this.http.get<Empresa>(`${this.url}/listar/${id}`);
  }
}