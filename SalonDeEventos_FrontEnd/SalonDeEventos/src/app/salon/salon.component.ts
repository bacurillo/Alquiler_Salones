import { Component } from '@angular/core';
import { SalonService } from '../service/salon.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ImgSalonService } from '../service/imgSalon.service';
import { Salon } from '../modelo/salon';
import Swal from 'sweetalert2';
import { Empresa } from '../modelo/empresa';
import { EmpresaService } from '../service/empresa.service';
import { UploadFileService } from '../service/uploadFile.service';
import { FileModel } from '../modelo/fileModel';
import { ImgSalon } from '../modelo/imgSalon';
import { ImgProductoService } from '../service/imgProducto.service';
import { ImgProducto } from '../modelo/imgProducto';



@Component({
  selector: 'app-salon',
  templateUrl: './salon.component.html',
  styleUrls: ['./salon.component.css']
})
export class SalonComponent {

  constructor(private salonService: SalonService, private EmpresaService: EmpresaService,
    private router: Router, private toastr: ToastrService, private imgSalonService: ImgSalonService,
    private activatedRoute: ActivatedRoute, private fileService: UploadFileService, private proimagen: ImgProductoService) { }

  accion: string = "";
  seleccionados: Empresa = new Empresa;
  salon: Salon = new Salon();
  empresa: Empresa = new Empresa();
  selectedFiles: File[] = [];
  filePreviews: string[] = [];
  images: ImgProducto[] = [];



  ngOnInit(): void {
    this.cargarAccion()
  }

  registrarSalon(): void {
    if (this.validarSalon()) {
      if (this.accion === 'registrar') {
        this.salon.salEstado = 1;
      }

      let imgSalon: ImgSalon[] = [];

      this.EmpresaService.getEmpresaPorId(1).subscribe(emp => {

        this.salon.empId = emp;
        this.salonService.crearSalon(this.salon).subscribe(
          salonNew => {

            this.fileService.uploadFiles(this.selectedFiles).subscribe(
              (response: FileModel[]) => {


                for (let file of response) {
                  let sal: ImgSalon = new ImgSalon();
                  sal.imgSalNombre = file.name;
                  // prod.imgProdUrl = file.url;

                  this.fileService.getFileName(sal.imgSalNombre).subscribe(fileName => {
                    sal.imgSalUrl = fileName.url;
                    sal.salId = salonNew;

                    imgSalon.push(sal)
                    console.log("=============================")
                    this.imgSalonService.agregarIMG(sal).subscribe(img => {

                    });
                  });


                  // this.imgProductoService.agregarIMG(prod).subscribe(img => {

                  // });

                }
                // for (let file of response) {


                // }

                console.log('Archivos subidos correctamente:', response);

                // Realiza las operaciones necesarias con los archivos subidos
                // ...
                Swal.fire({
                  position: 'center',
                  icon: 'success',
                  title: 'Registro exitoso',
                  showConfirmButton: true
                }).then(() => {
                  location.reload();
                });
              },
              (error: any) => {
                console.error('Error al subir los archivos:', error);
                // Maneja el error adecuadamente
                // ...
              }
            );


            Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'Registro exitoso',
              showConfirmButton: true
            }).then(() => {
              location.reload();
            })
          })
      })
    }
  }

  cargarSalon(): void {
    this.activatedRoute.params.subscribe(params => {
      let id = params['id']
      if (id) {
        this.salonService.getSalonId(id).subscribe((salon) => {
          this.salon = salon
        })
      }
    })
  }


  cargarAccion(): void {
    this.activatedRoute.params.subscribe(params => {
      this.accion = params['accion']
      console.log(this.accion)
      if (this.accion === 'editar') {
        this.cargarSalon();
      }
    })
  }


  onFileChange(event: any): void {
    this.selectedFiles = Array.from(event.target.files);
    this.filePreviews = [];
    console.log("select= " + this.selectedFiles.length)

    for (const file of this.selectedFiles) {
      this.getPreviewUrl(file).then((previewUrl) => {
        this.filePreviews.push(previewUrl);
        console.log("PREVIEW= " + this.filePreviews.length)

      });
    }
  }

  getPreviewUrl(file: File): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = (e: any) => {
        resolve(e.target.result);
      };

      reader.onerror = (e) => {
        reject(e);
      };

      reader.readAsDataURL(file);
    });
  }

  uploadFiles(): void {
    this.fileService.uploadFiles(this.selectedFiles).subscribe(
      (response: FileModel[]) => {
        console.log('Archivos subidos correctamente:', response);
        // Realiza las operaciones necesarias con los archivos subidos
        // ...
      },
      (error: any) => {
        console.error('Error al subir los archivos:', error);
        // Maneja el error adecuadamente
        // ...
      }
    );
  }

  validarSalon(): boolean {
    let tiempo: number = 4000;

    let ban: boolean = true;

    if (this.salon.salNombre.length === 0) {
      this.toastr.error('Debe ingresar un nombre para el salón', '', {
        timeOut: tiempo
      });
      ban = false;
    }

    if (this.salon.salLongitud === 0) {
      this.toastr.error('Debe ingresar una longitud', '', {
        timeOut: tiempo
      });
      ban = false;
    }

    if (this.salon.salLatitud === 0) {
      this.toastr.error('Debe ingresar una latitud', '', {
        timeOut: tiempo
      });
      ban = false;
    }

    if (this.salon.salDireccion.length === 0) {
      this.toastr.error('Debe ingresar una direccion', '', {
        timeOut: tiempo
      });
      ban = false;
    }

    if (this.salon.salCapacidad === 0) {
      this.toastr.error('Debe ingresar una capacidad', '', {
        timeOut: tiempo
      });
      ban = false;
    }

    if (this.salon.salCostoHora === 0) {
      this.toastr.error('Debe ingresar un costo de hora valido', '', {
        timeOut: tiempo
      });
      ban = false;
    }

    return ban;
  }

}
