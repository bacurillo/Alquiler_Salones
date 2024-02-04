import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable, map } from 'rxjs';
import { ProductoServicio } from '../modelo/producto-servicio';
import { ProductoComponent } from '../producto/producto.component';

@Injectable({
    providedIn: 'root'
})
export class productoService {

   private url: string = 'http://localhost:9999/productoServicio'
    // private url: string = 'http://147.182.165.168:9999/productoServicio'

    private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' })


    constructor(private http: HttpClient) { }

    crearProducto(productoServicio: ProductoServicio): Observable<ProductoServicio> {
        return this.http.post<ProductoServicio>(this.url + "/crear", productoServicio, { headers: this.httpHeaders })
    }

    getProducto(): Observable<ProductoServicio[]> {
        return this.http.get(this.url + "/listar").pipe(map(response => response as ProductoServicio[]));
    }

    buscarId(id: number): Observable<ProductoServicio> {
        return this.http.get<ProductoServicio>(`${this.url}/buscar/${id}`);
    }

    buscarProd(busqueda: string, est: number): Observable<ProductoServicio[]> {
        console.log(`${this.url}/busqueda/${busqueda}/${est}`)
        return this.http.get(`${this.url}/busqueda/${busqueda}/${est}`).pipe(map(response => response as ProductoServicio[]));
    }

    listarEst(est: number): Observable<ProductoServicio[]> {
        return this.http.get(`${this.url}/listar/${est}`).pipe(map(response => response as ProductoServicio[]));
    }

    delete(id: number): Observable<ProductoServicio> {
        return this.http.put<ProductoServicio>(`${this.url}/eliminarE/${id}`, null);
    }

    actualizarEst(id: number, estado: number): Observable<ProductoServicio> {
        return this.http.put<ProductoServicio>(`${this.url}/actualizarEst/${id}/${estado}`, null);
    }

}