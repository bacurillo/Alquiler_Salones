import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs';
import { Tipo } from '../modelo/tipo';

@Injectable({
  providedIn: 'root'
})
export class TipoService {

  private url: string = 'http://localhost:9999/tipo'
  // private url: string = 'http://147.182.165.168:9999/tipo'

  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' })

  constructor(private http: HttpClient) { }


   //recuperar categorias activas o inactivas
   getTipos():Observable<Tipo[]>{
    return this.http.get<Tipo[]>(this.url+"/listar");
  }
}