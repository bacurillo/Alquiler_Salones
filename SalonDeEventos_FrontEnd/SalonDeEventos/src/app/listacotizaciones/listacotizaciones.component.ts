import { Component, OnInit } from '@angular/core';
import { Cotizacion } from '../modelo/cotizacion';
import { CotizacionService } from '../service/cotizacion.service';
import { Salon } from '../modelo/salon';
import { Usuario } from '../modelo/usuario';

@Component({
  selector: 'app-listacotizaciones',
  templateUrl: './listacotizaciones.component.html',
  styleUrls: ['./listacotizaciones.component.css']
})
export class ListacotizacionesComponent implements OnInit{
  cotizaciones: Cotizacion[] = [];
  salones: Salon[] = [];
    idUsu: number = 0;

  constructor(private cotizacionService: CotizacionService) { }

  ngOnInit(): void {
    this.listarCotizaciones();
  }

  listarCotizaciones(): void {
    this.cotizacionService.getCotizacion().subscribe(
      cotizacion => {
        this.cotizaciones = cotizacion;
        for(let cot of cotizacion){

          console.log(cot.cotiMonto)
        }
      }
    );
  }

  getSalonName(salon: Salon): string {
    return salon ? salon.salNombre : '';
  }

  getUsuarioName(usuario: Usuario): string {
    return usuario ? usuario.usuNombreUsuario : '';
  }

}
