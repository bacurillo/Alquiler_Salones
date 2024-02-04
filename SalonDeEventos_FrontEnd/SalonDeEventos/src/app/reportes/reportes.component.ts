import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AllScriptsService } from '../scripts/all-scripts.service';
import { DomSanitizer } from '@angular/platform-browser';
import { Reserva } from '../modelo/reserva';
import { ReservaService } from '../service/reserva.service';
import * as pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from 'pdfmake/build/vfs_fonts';

(<any>pdfMake).vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.component.html',
  styleUrls: ['./reportes.component.css']
})
export class ReportesComponent implements OnInit {

  fechaIni: Date = new Date();
  fechaFin: Date = new Date();
  reporteFechas: Reserva[] = [];
  estado: number = 1;
  // pdfData: string = ""; // Aquí debes tener la cadena Base64 del archivo PDF que deseas enviar
  destinatario: string = "bryan.curillo.est@tecazuay.edu.ec"; // Aquí debes tener la dirección de correo del destinatario


  constructor(private el: ElementRef, private renderer: Renderer2, private activatedRoute: ActivatedRoute, private AllScripts: AllScriptsService,
    private sanitizer: DomSanitizer, private reservaService: ReservaService) {
    AllScripts.Cargar(["default/ventana"])


  }
  ngOnInit(): void {
  }


  generarPDF() {
    // Datos del reporte (debes reemplazar esto con tus datos reales)
    const data = {

      title: 'Reporte de reservas',
      estado: this.viewEstado(this.estado),
      fechaInicio: this.fechaFormateada(this.fechaIni),
      fechaFin: this.fechaFormateada(this.fechaFin),
      tableHeaders: ['N°', 'CEDULA', 'NOMBRE', 'CORREO', 'FECHA EVENTO', 'SALÓN', 'COSTO'],
      reporteFechas: this.reporteFechas,
      total: this.calcularTotal(),

    };

    // Definir el contenido del PDF utilizando la estructura de pdfmake
    const documentDefinition = {
      content: [
        // {
        //   image: 'assets/img/boda.jpg',
        // },
        { text: data.title, style: 'header' },
        { text: 'Desde: ' + data.fechaInicio },
        { text: 'Hasta: ' + data.fechaFin },
        { text: 'Estado: ' + data.estado },
        { text: '\n' }, // Agrega un salto de línea antes de la tabla
        {
          table: {
            headerRows: 1,
            // widths: [20, 'auto', 100, 100, 'auto', 'auto', 'auto'],
            widths: ['auto', 'auto', 'auto', 'auto', 'auto', 'auto', 'auto'],
            body: [data.tableHeaders, ...data.reporteFechas.map(res => [
              res.resId,
              res.reCotiId.usuId.usuPerId.perCedula,
              res.reCotiId.usuId.usuPerId.perNombre + ' ' + res.reCotiId.usuId.usuPerId.perApellido,
              res.reCotiId.usuId.usuPerId.perCorreo,
              // this.fechaFormateada(res.resFechaRegistro),
              this.fechaFormateada(res.resFechaEvento),
              res.reCotiId.salId.salNombre,
              '$' + res.reCotiId.cotiMonto
            ])]
          }
        },
        { text: '\n' },
        { text: 'TOTAL: $' + data.total },
      ],
      styles: {
        header: {
          fontSize: 18,
          bold: true,
          // alignment: 'center' // Alineación centrada para el título
        }
      }
    };

    // Generar el PDF
    const pdfDocGenerator = pdfMake.createPdf(documentDefinition);
    pdfDocGenerator.open();
  }


  descargarPDF() {
    // Datos del reporte (debes reemplazar esto con tus datos reales)
    const data = {

      title: 'Reporte de reservas',
      estado: this.viewEstado(this.estado),
      fechaInicio: this.fechaFormateada(this.fechaIni),
      fechaFin: this.fechaFormateada(this.fechaFin),
      tableHeaders: ['N°', 'CEDULA', 'NOMBRE', 'CORREO', 'FECHA EVENTO', 'SALÓN', 'COSTO'],
      reporteFechas: this.reporteFechas,
      total: this.calcularTotal(),
    };

    // Definir el contenido del PDF utilizando la estructura de pdfmake
    const documentDefinition = {
      content: [
        { text: data.title, style: 'header' },
        { text: 'Desde: ' + data.fechaInicio },
        { text: 'Hasta: ' + data.fechaFin },
        { text: 'Estado: ' + data.estado },
        { text: '\n' }, // Agrega un salto de línea antes de la tabla
        {
          table: {
            headerRows: 1,
            // widths: [20, 'auto', 100, 100, 'auto', 'auto', 'auto'],
            widths: ['auto', 'auto', 'auto', 'auto', 'auto', 'auto', 'auto'],
            body: [data.tableHeaders, ...data.reporteFechas.map(res => [
              res.resId,
              res.reCotiId.usuId.usuPerId.perCedula,
              res.reCotiId.usuId.usuPerId.perNombre + ' ' + res.reCotiId.usuId.usuPerId.perApellido,
              res.reCotiId.usuId.usuPerId.perCorreo,
              // this.fechaFormateada(res.resFechaRegistro),
              this.fechaFormateada(res.resFechaEvento),
              res.reCotiId.salId.salNombre,
              '$' + res.reCotiId.cotiMonto
            ])]
          }
        },
        { text: '\n' },
        { text: 'TOTAL: ' + data.total },
      ],
      styles: {
        header: {
          fontSize: 18,
          bold: true,

          // alignment: 'center' // Alineación centrada para el título
        }
      }
    };

    // Generar el PDF
    const pdfDocGenerator = pdfMake.createPdf(documentDefinition);
    pdfDocGenerator.download('Reporte de reservas');
  }

  calcularTotal(): number {
    let total: number = 0;

    for (let r of this.reporteFechas) {
      total = total + r.reCotiId.cotiMonto;
    }
    return total;
  }


  viewEstado(valor: number): string {
    let valorS: string = valor.toString();

    let msj = ""
    switch (parseInt(valorS)) {
      case 0:
        msj = "RECHAZADO";
        break;
      case 1:
        msj = "PENDIENTE";
        break;
      case 2:
        msj = "APROBADO";
        break;
      default:
        msj = "DESCONOCIDO";
        break;
    }
    return msj

  }

  fechaInicioFormateada(): string {
    const fecha: Date = new Date(this.fechaIni)
    const dia = fecha.getDate().toString().padStart(2, '0');
    const mes = (fecha.getMonth() + 1).toString().padStart(2, '0');
    const anio = fecha.getFullYear().toString();
    return `${anio}-${mes}-${dia}`;
  }

  fechaFinFormateada(): string {
    const fecha: Date = new Date(this.fechaFin)
    const dia = fecha.getDate().toString().padStart(2, '0');
    const mes = (fecha.getMonth() + 1).toString().padStart(2, '0');
    const anio = fecha.getFullYear().toString();
    return `${anio}-${mes}-${dia}`;
  }

  fechaFormateada(f: Date): string {
    const fecha: Date = new Date(f)
    const dia = fecha.getDate().toString().padStart(2, '0');
    const mes = (fecha.getMonth() + 1).toString().padStart(2, '0');
    const anio = fecha.getFullYear().toString();
    return `${dia}-${mes}-${anio}`;
  }


  obtenerReporteFecha(): void {
    console.log(this.estado + "   " + this.viewEstado(this.estado))
    // console.log(this.fechaInicioFormateada() + " === " + this.fechaFinFormateada())
    this.reservaService.reporteFechas(this.fechaInicioFormateada(), this.fechaFinFormateada(), this.estado).subscribe(res => {
      this.reporteFechas = res;
    })
  }

  mostrarVentanaLogin2(): void {
    const userString = localStorage.getItem('userData');

    if (userString !== null) {
      const ventanaFlotante = this.el.nativeElement.querySelector('.ventana-flotante2');
      this.renderer.setStyle(ventanaFlotante, 'display', 'flex');
    } else {

    }

  }
  mostrarVentanaLogin3(): void {
    const userString = localStorage.getItem('userData');

    if (userString !== null) {
      const ventanaFlotante = this.el.nativeElement.querySelector('.ventana-flotante3');
      this.renderer.setStyle(ventanaFlotante, 'display', 'flex');
    } else {

    }

  }

  mostrarVentanaLogin4(): void {
    const userString = localStorage.getItem('userData');

    if (userString !== null) {
      const ventanaFlotante = this.el.nativeElement.querySelector('.ventana-flotante4');
      this.renderer.setStyle(ventanaFlotante, 'display', 'flex');
    } else {

    }

  }

}
