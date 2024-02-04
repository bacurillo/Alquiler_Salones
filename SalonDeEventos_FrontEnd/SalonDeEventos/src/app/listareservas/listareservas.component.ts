import { Component, OnInit } from '@angular/core';
import { ReservaService } from '../service/reserva.service';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Reserva } from '../modelo/reserva';

@Component({
  selector: 'app-listareservas',
  templateUrl: './listareservas.component.html',
  styleUrls: ['./listareservas.component.css']
})
export class ListareservasComponent implements OnInit {
  reservas: Reserva[] = [];

  estado: number = 1;


  constructor(private reservaService: ReservaService) { }

  ngOnInit(): void {
    this.listarReservas()
  }
  listarReservas(): void {

    this.reservaService.listarEst(this.estado).subscribe(
    // this.reservaService.getReserva().subscribe(
      (reservas: Reserva[]) => {
        this.reservas = reservas;
      }
    );
  }

  estados(est: number): string {
    let estado: string = "";

    switch (est) {
      case 0:
        estado = "Rechazado";
        break;
      case 1:
        estado = "Pendiente";
        break;
      case 2:
        estado = "Aprobado";
        break;

    }

    return estado;
  }


}
