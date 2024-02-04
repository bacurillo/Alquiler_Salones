import { Component, OnInit } from '@angular/core';
import { ElementRef, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-headers',
  templateUrl: './headers.component.html',
  styleUrls: ['./headers.component.css']
})
export class HeadersComponent implements OnInit {

  constructor(private renderer: Renderer2, private el: ElementRef) { }
  ngOnInit(): void {
    this.obtenervacio();
  }

  cerrarSesion(): void {
    localStorage.removeItem('userData');


  }

  obtenervacio(): void {
    const userString = localStorage.getItem('userData');

    if (userString === null) {

      const ventanaFlotante = this.el.nativeElement.querySelector('.boton1');
      this.renderer.setStyle(ventanaFlotante, 'display', 'none');
    } else {
      const ventanaFlotante = this.el.nativeElement.querySelector('.boton2');
      this.renderer.setStyle(ventanaFlotante, 'display', 'none');

    }
  }
}
