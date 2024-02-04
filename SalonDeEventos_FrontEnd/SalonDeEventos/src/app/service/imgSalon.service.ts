import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable, map } from 'rxjs';
import { ImgSalon } from '../modelo/imgSalon';

@Injectable({
  providedIn: 'root'
})
export class ImgSalonService {

  private url: string = 'http://localhost:9999/imgsalones'
  // private url: string = 'http://147.182.165.168:9999/imgsalones'

  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' })

  constructor(private http: HttpClient) { }

  agregarIMG(persona: ImgSalon): Observable<ImgSalon> {
    return this.http.post<ImgSalon>(`${this.url}/crear`, persona, { headers: this.httpHeaders })
  }

  imgsProdId(prod:number): Observable<ImgSalon[]> {
    return this.http.get(`${this.url}/urls/${prod}`).pipe(map(response => response as ImgSalon[]));
  }

  imgsProd(): Observable<ImgSalon[]> {
    return this.http.get(`${this.url}/listar`).pipe(map(response => response as ImgSalon[]));
  }

}