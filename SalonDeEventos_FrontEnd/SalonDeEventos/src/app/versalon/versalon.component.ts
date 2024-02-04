import { Component, OnInit } from '@angular/core';
import { Salon } from '../modelo/salon';
import { SalonService } from '../service/salon.service';
import { ActivatedRoute, Router } from '@angular/router'
import { ImgSalon } from '../modelo/imgSalon';
import { ImgSalonService } from '../service/imgSalon.service';

@Component({
  selector: 'app-versalon',
  templateUrl: './versalon.component.html',
  styleUrls: ['./versalon.component.scss']
})
export class VersalonComponent implements OnInit {

  constructor(private salservice: SalonService, private activatedRoute: ActivatedRoute, private salimagen: ImgSalonService) {

  }

  salones: Salon[] = [];
  salon: Salon = new Salon();
  images: ImgSalon[] = [];

  ngOnInit(): void {
    this.listarSalones();
    this.cargarSal();
    this.imgsSalon();
  }

  listarSalones(): void {
    this.salservice.getSalon().subscribe(
      salones => {
        this.salones = salones;
        console.log(this.salones); // Imprime los salones en la consola
      },
      error => {
        console.log('Error al obtener los salones:', error);
      }
    );
  }

  cargarSal(): void {
    this.activatedRoute.params.subscribe(params => {
      let id = params['id']
      if (id) {
        this.salservice.buscarSalon(id).subscribe((sal) => {
          this.salon = sal;
          // Asignar el objeto 'sal' completo en lugar de 'sal.salId'
          console.log("rol= " + this.salon.salNombre)

        })
      }
    })
  }

  imgsSalon(): void {
    this.salimagen.imgsProd().subscribe(
      img => {
        this.images = img;
      }
    )
  }

  ObtenerFoto(id: number): string {

    let url: string = "";

    for (let img of this.images) {

      if (img.imgSalId == id) {

        url = img.imgSalUrl

        break;
      }

    }

    return url;
  }
}
