import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Reserva } from "../modelo/reserva";
import { Observable, map } from "rxjs";
import { Cotizacion } from "../modelo/cotizacion";

@Injectable({
    providedIn: 'root'
})
export class CotizacionService {

   private url: string = 'http://localhost:9999/cotizacion'
//    private url: string = 'http://147.182.165.168:9999/cotizacion'

    private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' })

    constructor(private http: HttpClient) { }


    getCotizacion(): Observable<Cotizacion[]> {
        return this.http.get(this.url + "/listar").pipe(map(response => response as Cotizacion[]));
    }

    crearCotizacion(coti: Cotizacion): Observable<Cotizacion> {
        return this.http.post<Cotizacion>(`${this.url}/crear`, coti, { headers: this.httpHeaders })
    }

    buscarId(id: number): Observable<Cotizacion> {
        return this.http.get<Cotizacion>(`${this.url}/buscar/${id}`);
    }

    misCotizacion(id: number): Observable<Cotizacion[]> {
        return this.http.get(`${this.url}/misCotizacion/${id}`).pipe(map(response => response as Cotizacion[]));
    }

    cotizacionReservada(idCot: number): Observable<boolean> {
        return this.http.get<boolean>(`${this.url}/cotizacionReservada/${idCot}`);
    }

}
