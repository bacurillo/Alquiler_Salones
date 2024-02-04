import { Component } from '@angular/core';
import { Cotizacion } from '../modelo/cotizacion';
import { CotizacionService } from '../service/cotizacion.service';
import { Salon } from '../modelo/salon';
import { Usuario } from '../modelo/usuario';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-mis-cotizaciones',
  templateUrl: './mis-cotizaciones.component.html',
  styleUrls: ['./mis-cotizaciones.component.css']
})
export class MisCotizacionesComponent {
  cotizaciones: Cotizacion[] = [];
  cotizacionesFiltro: Cotizacion[] = [];
  salones: Salon[] = [];
  idUsu: number = 0;
  estado: number = 0;


  constructor(private cotizacionService: CotizacionService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.cargarUsu();
    this.listarCotizaciones();
  }

  // filtro(): void {
  //   this.cotizacionesFiltro=[];

  //   switch (this.estado) {
  //     case 0:
  //       this.cotizacionesFiltro  =this.cotizaciones;      
  //       break;
  //     case 1:
  //       // estado = "Pendiente";
  //       break;
  //     case 2:
  //       // estado = "Aprobado";
  //       break;

  //   }


  // }

  listarCotizaciones(): void {
    this.cotizacionService.misCotizacion(this.idUsu).subscribe(
      cotizacion => {
        this.cotizaciones = cotizacion;
        this.cotizacionesFiltro = cotizacion;
      }
    );
  }

  cargarUsu(): void {
    this.activatedRoute.params.subscribe(params => {
      let id = params['id']
      if (id) {
        this.idUsu = id;
      }
    })
  }

  getSalonName(salon: Salon): string {
    return salon ? salon.salNombre : '';
  }
  getUsuarioName(usuario: Usuario): string {
    return usuario ? usuario.usuNombreUsuario : '';
  }

}
