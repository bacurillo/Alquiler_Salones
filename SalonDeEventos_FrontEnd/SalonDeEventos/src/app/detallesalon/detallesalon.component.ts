import { Component } from '@angular/core';
import { SalonService } from '../service/salon.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Salon } from '../modelo/salon';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-detallesalon',
  templateUrl: './detallesalon.component.html',
  styleUrls: ['./detallesalon.component.css']
})
export class DetallesalonComponent {

  salon: Salon = new Salon();

  constructor(private salonService: SalonService,
    private activatedRoute: ActivatedRoute, private router: Router) {
  }

  update(): void {
    Swal.fire({
      title: `¿Esta seguro de modificar sus datos?`,
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: 'Si',
      denyButtonText: 'No',
      customClass: {
        actions: 'my-actions',
        cancelButton: 'order-1 right-gap',
        confirmButton: 'order-2',
        denyButton: 'order-3',
      }
    }).then((result) => {
      if (result.isConfirmed) {

        this.salonService.update(this.salon.salId, this.salon).subscribe(response => {

          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Sus datos se actualizaron correctamente',
            showConfirmButton: true
            // timer: 3500
          }).then(() => {
            this.router.navigate(["listasal"]);
          });
        });
      } else if (result.isDenied) {
        Swal.fire('Verifique sus datos antes de cambiarlos', '', 'info')
      }
    }
    )
  }
}




