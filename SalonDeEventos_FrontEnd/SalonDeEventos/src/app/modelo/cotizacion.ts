import { Reserva } from "./reserva";
import { Salon } from "./salon";
import { Usuario } from "./usuario";

export class Cotizacion {
    cotiId: number;
    cotiTipoEvento: string;//
    // cotiFechaEvento: Date;////no va
    cotiDescripcion: string;//
    cotiEstado: number;//
    cotiMonto: number;//
    cotiHoraFin: string;//
    cotiHoraInicio: string;//
    cotiFechaRegistro: Date;//
    salId: Salon;//
    usuId: Usuario;//

    constructor(
        cotiId?: number,
        cotiTipoEvento?: string,
        // cotiFechaEvento?: Date,
        cotiDescripcion?: string,
        cotiEstado?: number,
        cotiMonto?: number,
        cotiHoraFin?: string,
        cotiHoraInicio?: string,
        cotiFechaRegistro?: Date,
        salId?: Salon,
        usuId?: Usuario
    ) {
        this.cotiId = cotiId || 0;
        this.cotiTipoEvento = cotiTipoEvento || "";
        // this.cotiFechaEvento = cotiFechaEvento || new Date();
        this.cotiDescripcion = cotiDescripcion || "";
        this.cotiEstado = cotiEstado || 0;
        this.cotiMonto = cotiMonto || 0;
        this.cotiHoraFin = cotiHoraFin || "";
        this.cotiHoraInicio = cotiHoraInicio || "";
        this.cotiFechaRegistro = cotiFechaRegistro || new Date();
        this.salId = salId || new Salon();
        this.usuId = usuId || new Usuario();
    }
}
