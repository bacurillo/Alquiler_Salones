import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpEvent, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FileModel } from '../modelo/fileModel';

@Injectable({
  providedIn: 'root'
})
export class UploadFileService {

  //Url obtenida de la variable de enviroments
  private baseUrl: string = 'http://localhost:9999/file'
  // private baseUrl: string = 'http://147.182.165.168:9999/file'


  uploadFiles(files: File[]): Observable<FileModel[]> {
    const formData = new FormData();

    for (const file of files) {
      formData.append('files', file);
    }

    return this.http.post<FileModel[]>(this.baseUrl + "/upload", formData);
  }

  //Inyeccion de HttpClient
  constructor(private http: HttpClient) { }

  //Metodo que envia los archivos al endpoint /upload 
  upload(file: File): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();
    formData.append('files', file);

    const req = new HttpRequest('POST', `${this.baseUrl}/upload`, formData, {
      reportProgress: true,
      responseType: 'json'
    });
    return this.http.request(req);
  }

  //Metodo para Obtener los archivos
  getFile() {
    return this.http.get(`${this.baseUrl}/files`);
  }

  getFileName(filename: string): Observable<FileModel> {
    return this.http.get<FileModel>(`${this.baseUrl}/files/${filename}`);
  }

  //Metodo para borrar los archivos
  deleteFile(filename: string) {
    return this.http.get(`${this.baseUrl}/delete/${filename}`);
  }
}