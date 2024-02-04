import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ImagenService {

    private url: string = 'http://localhost:9999/imagen'
    // private url: string = 'http://147.182.165.168:9999/imagen'

    private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' })

    constructor(private http: HttpClient) { }

    obtenerImagenPorId(id: number): Observable<HttpResponse<any>> {
        const url = `${this.url}/obtener-archivo/${id}`;
        return this.http.get(url, { responseType: 'arraybuffer', observe: 'response' });
    }

    guardarImagen2(imagenBytes: Uint8Array): Observable<string> {
        return this.http.post<string>(`${this.url}/guardar-imagen`, imagenBytes);
    }

    uploadImage(imageData: string): Promise<string> {
        return new Promise<string>((resolve, reject) => {
            // Convert the base64 image to a byte array
            const byteCharacters = atob(imageData.split(',')[1]);
            const byteNumbers = new Array(byteCharacters.length);
            for (let i = 0; i < byteCharacters.length; i++) {
                byteNumbers[i] = byteCharacters.charCodeAt(i);
            }
            const byteArray = new Uint8Array(byteNumbers);

            // Make a POST request to your Spring Boot backend
            this.http.post<string>(this.url + '/guardar-imagen', byteArray).subscribe(
                (response) => {
                    resolve(response);
                },
                (error) => {
                    reject(error);
                }
            );
        });
    }

    guardarImagen(imagenBytes: Uint8Array): void {
        const url = 'http://localhost:9999/imagen/guardar-imagen';
    
        this.http.post<string>(url, imagenBytes).subscribe(
          (response) => {
            // El servidor devolverá el ID de la imagen como String en la respuesta
            const imageId = response;
            console.log('ID de la imagen guardada:', imageId);
          },
          (error) => {
            console.error('Error al guardar la imagen:', error);
          }
        );
      }
}
