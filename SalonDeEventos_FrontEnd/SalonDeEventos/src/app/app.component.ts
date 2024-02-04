import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'SalonDeEventos';
  mostrarFooter = true;

  constructor(private router: Router) {

    router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        // Ocultar el footer en la página de login
        if (event.url === '/login') {
          this.mostrarFooter = false;
        } else {
          this.mostrarFooter = true;
        }
      }
    });

  }
}
