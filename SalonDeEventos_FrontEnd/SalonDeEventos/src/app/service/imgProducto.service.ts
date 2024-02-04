import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable, map } from 'rxjs';
import { ImgProducto } from '../modelo/imgProducto';

@Injectable({
  providedIn: 'root'
})
export class ImgProductoService {

  private url: string = 'http://localhost:9999/imgproductos'
  // private url: string = 'http://147.182.165.168:9999/imgproductos'

  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' })

  constructor(private http: HttpClient) { }

  agregarIMG(img: ImgProducto): Observable<ImgProducto> {
    return this.http.post<ImgProducto>(`${this.url}/crear`, img, { headers: this.httpHeaders })
  }

  imgsProdId(prod:number): Observable<ImgProducto[]> {
    return this.http.get(`${this.url}/busqueda/${prod}`).pipe(map(response => response as ImgProducto[]));
  }

  imgsProdEst(est:number): Observable<ImgProducto[]> {
    return this.http.get(`${this.url}/busquedaEst/${est}`).pipe(map(response => response as ImgProducto[]));
  }

  imgsProd(): Observable<ImgProducto[]> {
    return this.http.get(`${this.url}/listar`).pipe(map(response => response as ImgProducto[]));
  }

}