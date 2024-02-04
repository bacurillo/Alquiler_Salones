// auth.service.ts

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isLoggedInFlag = false;
  public redirectUrl: string = '/menu'; // Ruta predeterminada para redirigir después del inicio de sesión

  constructor() { }

  // Verificar si el usuario ha iniciado sesión
  isLoggedIn(): boolean {
    return this.isLoggedInFlag;
  }

  // Simular el inicio de sesión (por ejemplo, usando credenciales de usuario almacenadas en el servicio)
  login(username: string, password: string): boolean {
    // Aquí podrías hacer una solicitud al servidor para autenticar las credenciales.
    // En este ejemplo, solo estamos simulando el inicio de sesión con un usuario "admin" y una contraseña "password".
    if (username === 'admin' && password === 'password') {
      this.isLoggedInFlag = true;
      return true;
    }
    return false;
  }

  // Cerrar sesión del usuario
  logout(): void {
    this.isLoggedInFlag = false;
  }
}