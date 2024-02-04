import { Component, OnInit } from '@angular/core';
import { Usuario } from '../modelo/usuario';
import { AllScriptsService } from '../scripts/all-scripts.service';
import { DomSanitizer } from '@angular/platform-browser';
import { SafeResourceUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ElementRef, Renderer2 } from '@angular/core';
import { UsuarioService } from '../service/usuario.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private renderer: Renderer2, private UsuarioService: UsuarioService, private el: ElementRef, private AllScripts: AllScriptsService, private sanitizer: DomSanitizer, private router: Router) {
    AllScripts.Cargar(["default/ventana"]);
  }
  idrol: number = 2; // Ejemplo: supongamos que el usuario tiene un rol con id 2
  user: Usuario = new Usuario();

  usu: Usuario[] = [];
  ngOnInit(): void {
    this.obtenerUsuario();
    this.mostrarboton();
    this.mostrarboton2();

  }

  obtenerUsuario(): void {
    const userString = localStorage.getItem('userData');

    if (userString !== null) {
      this.user = JSON.parse(userString);
      this.router.navigate(['/perfil']);

    } else {
      console.error('No hay datos de usuario en el Local Storage');

    }
  }

  getMapUrl(latitud: number, longitud: number): SafeResourceUrl {
    const mapUrl = `https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3984.7770135720775!2d${longitud}!3d${latitud}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMsKwNTInNTAuMSJTIDc5wrAwMCc0MS42Ilc!5e0!3m2!1ses!2sec!4v1687016743604!5m2!1ses!2sec`;

    // Sanitizar la URL para evitar problemas de seguridad
    return this.sanitizer.bypassSecurityTrustResourceUrl(mapUrl);
  }


  mostrarVentanaLogin(): void {
    const userString = localStorage.getItem('userData');

    if (userString !== null) {
      this.router.navigate(['/perfiluser']);

    } else {
      const ventanaFlotante = this.el.nativeElement.querySelector('.ventana-flotante2');
      this.renderer.setStyle(ventanaFlotante, 'display', 'flex');
    }

  }

  mostrarVentanaLogin2(): void {
    const userString = localStorage.getItem('userData');

    if (userString !== null) {
      this.router.navigate(['/salones']);

    } else {
      const ventanaFlotante = this.el.nativeElement.querySelector('.ventana-flotante2');
      this.renderer.setStyle(ventanaFlotante, 'display', 'flex');
    }

  }

  mostrarVentanaLogin3(): void {
    const userString = localStorage.getItem('userData');

    if (userString !== null) {
      this.router.navigate(['/salones']);

    } else {
      const ventanaFlotante = this.el.nativeElement.querySelector('.ventana-flotante2');
      this.renderer.setStyle(ventanaFlotante, 'display', 'flex');
    }

  }

  mostrarboton(): void {
    const userString = localStorage.getItem('userData');

    if (this.user.rolId.rolId != 1) {

      const ventanaFlotante = this.el.nativeElement.querySelector('.boton7');
      this.renderer.setStyle(ventanaFlotante, 'display', 'none');
    } else {


      const ventanaFlotante = this.el.nativeElement.querySelector('.boton7');
      this.renderer.setStyle(ventanaFlotante, 'display', 'flex');
    }

  }


  mostrarboton2(): void {
    const userString = localStorage.getItem('userData');

    if (this.user.rolId.rolId != 2) {
      const ventanaFlotante = this.el.nativeElement.querySelector('.boton8');
      this.renderer.setStyle(ventanaFlotante, 'display', 'none');

    } else {


      const ventanaFlotante = this.el.nativeElement.querySelector('.boton8');
      this.renderer.setStyle(ventanaFlotante, 'display', 'flex');
    }

  }

  header(): void {
    const userString = localStorage.getItem('userData');

    if (userString !== null) {

    } else {
      const ventanaFlotante = this.el.nativeElement.querySelector('.ventana-flotante2');
      this.renderer.setStyle(ventanaFlotante, 'display', 'flex');
    }

  }




}




