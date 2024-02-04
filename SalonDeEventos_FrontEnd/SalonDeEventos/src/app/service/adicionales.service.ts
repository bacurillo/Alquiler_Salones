import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable, map } from "rxjs";
import { Adicionales } from '../modelo/adicionales';

@Injectable({
  providedIn: 'root'
})
export class AdicionalesService {

  private url: string = 'http://localhost:9999/adicionales'
  // private url: string = 'http://147.182.165.168:9999/adicionales'

  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' })

  constructor(private http: HttpClient) { }

  crearAdicional(adicionales: Adicionales): Observable<Adicionales> {
    return this.http.post<Adicionales>(this.url + "/crear", adicionales, { headers: this.httpHeaders })
  }

  adicionalesCoti(id: number): Observable<Adicionales[]> {
    return this.http.get(`${this.url}/adicionalesCoti/${id}`).pipe(map(response => response as Adicionales[]));
}
}
