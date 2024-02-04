import { Component } from '@angular/core';
import { Usuario } from '../modelo/usuario';

@Component({
  selector: 'app-perfiluser',
  templateUrl: './perfiluser.component.html',
  styleUrls: ['./perfiluser.component.css']
})
export class PerfiluserComponent {

  usuario:Usuario=new Usuario();
  constructor() {

  }

  ngOnInit(): void {
    this.obtenerUsuario();
  }

  obtenerUsuario() {
    // Recuperar el string del localStorage
    const userString = localStorage.getItem('userData');

    // Verificar si el string existe en el localStorage
    if (userString) {
      const login = JSON.parse(userString);
      this.usuario = login;

    }

  }


  
  formatDate(date: Date): string {
    // Formatea la fecha como 'dd-MM-yyyy' para que coincida con el formato del campo de entrada
    // console.log(date)
    const nacimiento: Date = new Date(date);
    const year = nacimiento.getFullYear();
    const month = ('0' + (nacimiento.getMonth() + 1)).slice(-2);
    const day = ('0' + nacimiento.getDate()).slice(-2);
    return `${day}-${month}-${year}`;
  }

}
