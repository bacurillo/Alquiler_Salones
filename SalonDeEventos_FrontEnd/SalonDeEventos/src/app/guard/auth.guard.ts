import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) { }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    // Aquí debes implementar la lógica para verificar si el usuario está autenticado.
    // Por ejemplo, podrías verificar si hay información del usuario en el localStorage.

    const userData = localStorage.getItem('userData');

    
    const loggedIn = userData ? true : false;
    // alert(loggedIn)
    if (loggedIn) {
      return true; // El usuario está autenticado y puede acceder a la ruta.
    } else {
      // El usuario no está autenticado, redirígelo a la página de inicio de sesión.
      this.router.navigate(['/login']);
      return false;
    }
  }
  
}
