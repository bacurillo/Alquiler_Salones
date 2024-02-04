import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Usuario } from '../modelo/usuario';

@Injectable({
  providedIn: 'root'
})
export class EmpleadoGuard implements CanActivate {


  constructor(private router: Router) { }

  sesion: Usuario = new Usuario();

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {


    const userData = localStorage.getItem('userData');
    if (userData) {
      const login = JSON.parse(userData);
      this.sesion = login;

    }

    const loggedIn = userData ? true : false;
    // alert(loggedIn)

    if (loggedIn) {

      if (this.sesion.rolId.rolId === 1 || this.sesion.rolId.rolId === 2) {
        return true;
      } else {
        this.router.navigate(['/menu']);
        return false;
      }

    } else {

      this.router.navigate(['/login']);
      return false;

    }


  }

}
