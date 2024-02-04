//a//
import { Component, OnInit } from '@angular/core';
import { ReservaService } from '../service/reserva.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Reserva } from '../modelo/reserva';
import { ImagenService } from '../service/imagen.service';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { CotizacionService } from '../service/cotizacion.service';
import { Usuario } from '../modelo/usuario';
import { Cotizacion } from '../modelo/cotizacion';
import { UploadFileService } from '../service/uploadFile.service';
import { FileModel } from '../modelo/fileModel';
import Swal from 'sweetalert2';
import * as pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from 'pdfmake/build/vfs_fonts';

(<any>pdfMake).vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-cotizacion',
  templateUrl: './cotizacion.component.html',
  styleUrls: ['./cotizacion.component.scss']
})
export class CotizacionComponent implements OnInit {
  //reserva :c
  imageToShow: any;

  reserva: Reserva = new Reserva();

  accion: string = "";

  fechaRegistro: Date = new Date();

  alertaOcupado: string = "";

  usuario: Usuario = new Usuario();


  empleado: Usuario = new Usuario();

  cotizacion: Cotizacion = new Cotizacion()

  numReserva: number = 0;

  selectedDate: Date = new Date();
  alertaOcupadoColor: string = "";

  selectedFile: File | null = null;

  constructor(private imagenService: ImagenService, private activatedRoute: ActivatedRoute, private cotizacionService: CotizacionService,
    private reservaService: ReservaService, private toastr: ToastrService, private imageService: ImagenService,
    private fileService: UploadFileService,
    private router: Router, private http: HttpClient) {
  }

  ngOnInit(): void {
    this.cargarAccion();
    this.reservaNum();
  }


  cargarCoti(): void {
    this.activatedRoute.params.subscribe(params => {
      let id = params['id']
      if (id) {
        this.cotizacionService.buscarId(id).subscribe((cot) => {
          this.cotizacion = cot;

        })
      }
    })
  }

  cargarAccion(): void {
    this.activatedRoute.params.subscribe(params => {
      this.accion = params['accion']
      console.log(this.accion)
      this.obtenerUsuario();
      if (this.accion === 'reservar') {

        this.cargarCoti();

      } else {
        this.cargarReserva();

      }
    })
  }

  reservaNum(): void {
    if (this.accion === 'reservar') {
      this.reservaService.numReserva().subscribe(num => {
        this.numReserva = num;
      })
    }
  }

  cargarReserva(): void {
    this.activatedRoute.params.subscribe(params => {
      let id = params['id']
      if (id) {
        this.reservaService.buscarId(id).subscribe((res) => {
          this.reserva = res;
          this.usuario = this.reserva.reCotiId.usuId;
          this.cotizacion = this.reserva.reCotiId
          this.numReserva = this.reserva.resId;
          this.selectedDate = this.reserva.resFechaEvento;
          this.filePreviews.push(this.reserva.resComprobante)
          // alert("seect= "+this.selectedDate)
        })
      }
    })

  }

  formatDate(date: Date): string {
    const nacimiento: Date = new Date(date);
    const year = nacimiento.getFullYear();
    const month = ('0' + (nacimiento.getMonth() + 1)).slice(-2);
    const day = ('0' + nacimiento.getDate()).slice(-2);
    return `${year}-${month}-${day}`;
  }


  validarReserva(id: number, est: number): void {
    this.reserva.usuId = this.empleado;
    // alert(this.reserva.usuId.usuId+" === "+this.usuario)
    this.reservaService.validarReserva(id, est, this.reserva).subscribe(
      res => {
        this.reserva = res;


        Swal.fire({
          title: `¿Está seguro de cambiar el estado de la reserva?`,
          showDenyButton: true,
          showCancelButton: false,
          confirmButtonText: 'Sí, estoy seguro.',
          denyButtonText: 'No, estoy seguro',
          customClass: {
            actions: 'my-actions',
            cancelButton: 'order-1 right-gap',
            confirmButton: 'order-2',
            denyButton: 'order-3',
          }
        }).then((result) => {
          if (result.isConfirmed) {
            Swal.fire('Reserva actualizada con éxito.', 'success')
            this.generarPDF();
            this.router.navigate(["listares"]);


          } else if (result.isDenied) {

          }
        })
      }
    )
  }

  convertImageToDataURL(): Promise<string> {
    const imageUrl = 'assets/png.png'; // Ruta de la imagen en la carpeta "assets"

    return new Promise((resolve, reject) => {
      // Realizar la solicitud para obtener la imagen como un blob
      this.http.get(imageUrl, { responseType: 'blob' }).subscribe(
        (blob: Blob) => {
          // Crear un FileReader para leer el blob como una URL de datos
          const reader = new FileReader();
          reader.onloadend = () => {
            const dataURL = reader.result as string;
            resolve(dataURL);
          };
          reader.onerror = (error) => {
            reject(error);
          };
          reader.readAsDataURL(blob); // Leer el blob como una URL de datos
        },
        (error) => {
          reject(error);
        }
      );
    });
  }


  generarPDF() {
    // Datos del reporte (debes reemplazar esto con tus datos reales)
// console.log(this.convertImageToDataURL())
    const data = {

      title: 'EL ESTADO DE SU RESERVA HA SIDO ACTUALIZADO',
      nombre: this.usuario.usuPerId.perNombre,
      apellido: this.usuario.usuPerId.perApellido,
      cedula: this.usuario.usuPerId.perCedula,
      correo: this.usuario.usuPerId.perCorreo,
      direccion: this.usuario.usuPerId.perDireccion,
      telefono: this.usuario.usuPerId.perTelefono,

      salonNombre: this.cotizacion.salId.salNombre,
      salonDireccion: this.cotizacion.salId.salDireccion,
      salonCapacidad: this.cotizacion.salId.salCapacidad,

      estado: this.viewEstado(this.reserva.resEstado),
      evento: this.cotizacion.cotiTipoEvento,
      horaIni: this.cotizacion.cotiHoraInicio,
      horaFin: this.cotizacion.cotiHoraFin,
      descripcion: this.cotizacion.cotiDescripcion,
      monto: this.cotizacion.cotiMonto,
      fechaEvento: this.fechaFormateada(this.reserva.resFechaEvento),
      fechaReserva: this.fechaFormateada(this.reserva.resFechaRegistro),
      img: this.convertImageToDataURL()

    };

    // Definir el contenido del PDF utilizando la estructura de pdfmake
    const documentDefinition = {
      content: [
        // { image: './assets/png.png', 
        // width: 100, height: 100 },
        { text: data.title, style: 'header' },
        { text: 'Su reserva se encuentra en estado: ' + data.estado },
        { text: '\n' },
        { text: 'Datos personales' },
        { text: 'Nombre: ' + data.nombre },
        { text: 'Apellido: ' + data.apellido },
        { text: 'Cedula: ' + data.cedula },
        { text: 'Correo: ' + data.correo },
        { text: 'Teléfono: ' + data.telefono },
        { text: 'Dirección: ' + data.direccion },

        { text: '\n' },
        { text: 'Datos del salón' },
        { text: 'Salón: ' + data.salonNombre },
        { text: 'Capacidad: ' + data.salonCapacidad },
        { text: 'Dirección: ' + data.salonDireccion },

        { text: '\n' },
        { text: 'Reserva realizada el día: ' + data.fechaReserva },
        { text: 'Detalles de la reserva' },
        { text: 'Tipo de evento: ' + data.evento },
        { text: 'Hora Inicio: ' + data.horaIni },
        { text: 'Hora Fin: ' + data.horaFin },
        { text: 'Descripción: ' + data.descripcion },
        { text: 'Costo: ' + data.monto },
        { text: 'Fecha del evento: ' + data.fechaEvento },

      ],
      styles: {
        header: {
          fontSize: 18,
          bold: true,

          // alignment: 'center' 
        }
      }
    };

    // Generar el PDF
    const pdfDocGenerator = pdfMake.createPdf(documentDefinition);
    pdfDocGenerator.open();

    pdfDocGenerator.getBase64((data) => {
      // Llamar al servicio enviarCorreo para enviar el PDF al backend
      this.enviarCorreo(data, this.usuario.usuPerId.perCorreo, this.viewEstado(this.reserva.resEstado));
    });    // pdfDocGenerator.download('reporte.pdf');
  }


  enviarCorreo(pdfData: string, destinatario: string, estado: string) {
    this.reservaService.enviarCorreoConPDF(pdfData, destinatario, estado).subscribe(
      response => {
        console.log('Correo enviado:', response);
        // Aquí puedes realizar acciones adicionales si es necesario
      },
      error => {
        console.error('Error al enviar el correo:', error);
        // Aquí puedes manejar el error de acuerdo a tus necesidades
      }
    );
  }

  viewEstado(est: number): string {
    let estado: string = "";

    switch (est) {
      case 0:
        estado = "RECHAZADO";
        break;
      case 1:
        estado = "PENDIENTE";
        break;
      case 2:
        estado = "APROBADO";
        break;

    }

    return estado;
  }
  fechaFormateada(f: Date): string {
    const fecha: Date = new Date(f)
    const dia = fecha.getDate().toString().padStart(2, '0');
    const mes = (fecha.getMonth() + 1).toString().padStart(2, '0');
    const anio = fecha.getFullYear().toString();
    return `${dia}-${mes}-${anio}`;
  }

  obtenerUsuario() {
    // Recuperar el string del localStorage
    const userString = localStorage.getItem('userData');

    // Verificar si el string existe en el localStorage
    if (userString) {
      const login = JSON.parse(userString);

      if (this.accion === 'reservar') {

        this.usuario = login;
      } else {
        this.empleado = login;
      }


    }

  }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  uploadImage(): void {
    if (!this.selectedFile) {
      alert('Por favor, selecciona una imagen.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event: any) => {
      const imageData = new Uint8Array(event.target.result);
      this.imagenService.guardarImagen2(imageData)
        .subscribe(
          (imageId: string) => {
            // alert('Imagen subida con éxito. ID de imagen: ' + imageId);
          },
          (error: any) => {
            // alert('Error al subir la imagen. Por favor, inténtalo de nuevo.');
          }
        );
    };
    reader.readAsArrayBuffer(this.selectedFile);
  }

  crearReserva(): void {

    this.reserva.usuId = this.usuario;
    this.reserva.reCotiId = this.cotizacion;
    this.reserva.resFechaRegistro = this.fechaRegistro;
    this.reserva.resFechaEvento = this.selectedDate;
    this.reserva.resEstado = 1; //PENDIENTE

    console.log("EVENTOO= " + this.reserva.resFechaEvento)

    // this.reserva.resFechaEvento=reserva;
    if (this.validarFecha()) {

      let ban: boolean = true;
      const reserva: Date = new Date(this.reserva.resFechaEvento);
      const anio: number = reserva.getFullYear();
      const mes: number = reserva.getMonth() + 1;
      const dia: number = reserva.getDate() + 1;


      this.reservaService.fechaOcupada(dia, mes, anio).subscribe(ocupado => {

        if (ocupado && this.accion === 'reservar') {

          this.alertaOcupado = "Fecha no disponible"
          this.alertaOcupadoColor = "red";
          this.toastr.error('La fecha que seleccionaste se encuentra ocupada actualmente', '', {
            timeOut: 2500
          });
        } else {
          this.alertaOcupado = "Fecha disponible"
          this.alertaOcupadoColor = "green";
          if (this.selectedFiles && this.selectedFiles.length > 0) {
            this.fileService.uploadFiles(this.selectedFiles).subscribe(
              (response: FileModel[]) => {


                for (let file of response) {
                  let url = "";
                  let name = "";
                  name = file.name;

                  this.fileService.getFileName(name).subscribe(fileName => {
                    this.reserva.resComprobante = fileName.url;

                    console.log("URL= " + fileName.url)

                    this.reservaService.crearReserva(this.reserva).subscribe(res => {


                      Swal.fire({
                        title: `¿Desea continuar con la reserva?`,
                        showDenyButton: true,
                        showCancelButton: false,
                        confirmButtonText: 'Sí, quiero continuar',
                        denyButtonText: 'Quizás más tarde',
                        customClass: {
                          actions: 'my-actions',
                          cancelButton: 'order-1 right-gap',
                          confirmButton: 'order-2',
                          denyButton: 'order-3',
                        }
                      }).then((result) => {
                        if (result.isConfirmed) {
                          Swal.fire('Su reserva se envió con éxito', 'Se encuentra en proceso de verificación, puede consultar el estado del proceso en su perfil.', 'success')
                          this.router.navigate(["menu"]);

                        } else if (result.isDenied) {

                        }
                      })
                    })
                  });

                }
                console.log('Archivos subidos correctamente:', response);


              },
              (error: any) => {
                console.error('Error al subir los archivos:', error);
                // Maneja el error adecuadamente
                // ...
              }
            );
          } else {

            Swal.fire({
              title: `Recuerde revisar los datos de su reserva, una vez enviado no se podrá cambiar.`,
              showDenyButton: true,
              showCancelButton: false,
              confirmButtonText: 'Enviar',
              denyButtonText: 'Revisar',
              customClass: {
                actions: 'my-actions',
                cancelButton: 'order-1 right-gap',
                confirmButton: 'order-2',
                denyButton: 'order-3',
              }
            }).then((result) => {
              if (result.isConfirmed) {
                this.reservaService.crearReserva(this.reserva).subscribe(res => {
                })
                Swal.fire('Su reserva se envió con éxito', 'Se encuentra en proceso de verificación, puede consultar el estado del proceso en su perfil.', 'success')
                this.router.navigate(["menu"]);

              } else if (result.isDenied) {

              }
            })

          }
        }
      })




    }


  }

  validarFecha(): boolean {
    let ban: boolean = true;
    let banFecha: boolean = true;
    let hoy: Date = new Date();

    // Establecer las fechas de hoy y de la reserva sin la hora
    const fechaRango: Date = new Date(hoy.getFullYear(), hoy.getMonth(), hoy.getDate() + 5);


    let fechaEvento: Date = new Date(this.reserva.resFechaEvento)
    const resFecha: Date = new Date(
      fechaEvento.getFullYear(),
      fechaEvento.getMonth(),
      fechaEvento.getDate()
    );
    // Comparar las fechas sin la hora
    if (resFecha < fechaRango && this.accion === 'reservar') {
      this.toastr.error('Recuerde que se debe reservar con un mínimo de 5 días de anticipación', 'Seleccione la Fecha del Evento', {
        timeOut: 3000
      });
      ban = false;
      banFecha = false;
    }

    const fechaRango2: Date = new Date(hoy.getFullYear() + 1, hoy.getMonth(), hoy.getDate());
    if (resFecha > fechaRango2 && this.accion === 'reservar' && banFecha) {

      this.toastr.error('Solo se puede reservar en el lapso de un año', 'Seleccione la Fecha del Evento', {
        timeOut: 3000
      });

      ban = false;
    }

    // alert("ba= "+ban)


    return ban;
  }




  validarDatosReserva(): boolean {
    if (this.accion === 'validar') {
      // Check if selectedDate is empty or undefined
      if (!this.selectedDate) {
        return false;
      }
    } else if (this.accion === 'reservar') {
      // Check if selectedDate is empty or undefined
      if (!this.selectedDate) {
        return false;
      }

      // Add more specific validations for other fields related to the reservation, if required.

      // For example, you can check if numReserva is empty or contains only whitespace characters.
      if (!this.numReserva || this.numReserva.toString() === '') {
        return false;
      }

      // Add more validations for other fields like usuario, cotizacion, fechaRegistro, etc.

      // For example, check if usuario object has valid values
      if (!this.usuario.usuPerId || !this.usuario.usuPerId.perCedula || !this.usuario.usuPerId.perNombre || !this.usuario.usuPerId.perTelefono || !this.usuario.usuPerId.perCorreo) {
        return false;
      }

      // Check if cotizacion object has valid values
      if (!this.cotizacion.salId || !this.cotizacion.salId.salNombre || !this.cotizacion.salId.salDireccion) {
        return false;
      }
    }

    // All fields are valid
    return true;
  }


  /////////////////////////////////////////
  selectedFiles: File[] = [];
  filePreviews: string[] = [];

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

  obtenerImagen(id: number): void {
    this.imagenService.obtenerImagenPorId(id)
      .subscribe(
        (response: HttpResponse<any>) => {
          const headers: HttpHeaders = response.headers;
          const contentType = headers.get('content-type');
          this.imageToShow = 'data:' + contentType + ';base64,' + this.arrayBufferToBase64(response.body);
        },
        error => {
          console.log('Error al obtener la imagen:', error);
        }
      );
  }

  // Función para convertir el array de bytes en una cadena base64
  arrayBufferToBase64(buffer: ArrayBuffer): string {
    let binary = '';
    const bytes = new Uint8Array(buffer);
    for (let i = 0; i < bytes.byteLength; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
  }
}

