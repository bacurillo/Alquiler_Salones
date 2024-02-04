import { Component, OnInit } from '@angular/core';
import { Salon } from '../modelo/salon';
import { SalonService } from '../service/salon.service';
import { ImgSalon } from '../modelo/imgSalon';
import { ImgSalonService } from '../service/imgSalon.service';

@Component({
  selector: 'app-vistasalones',
  templateUrl: './vistasalones.component.html',
  styleUrls: ['./vistasalones.component.css']
})
export class VistasalonesComponent implements OnInit {

  constructor(private salservice: SalonService, private salimagen: ImgSalonService) {

  }

  salones: Salon[] = [];
  images: ImgSalon[] = [];

  ngOnInit(): void {
    this.listarSalones();
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
