import { Cotizacion } from "./cotizacion";
import { Usuario } from "./usuario";

export class Reserva {

    resId: number;
    resEstado: number;
    resImagenRerserva:number;
    resComprobante: string;
    resFechaRegistro: Date;//
    resFechaEvento:Date;//
    reCotiId: Cotizacion;//
    usuId: Usuario;//

    constructor(
        reservaId?: number,
        resEstado?: number,
        resImagenRerserva?: number,
        resComprobante?: string,
        resFechaRegistro?: Date,
        resFechaEvento?:Date,
        reCotiId?: Cotizacion,
        usuId?: Usuario
    ) {
        this.resId = reservaId || 0;
        this.resEstado = resEstado || 0;
        this.resImagenRerserva = resImagenRerserva || 0;
        this.resComprobante = resComprobante || "";
        this.resFechaRegistro = resFechaRegistro || new Date();
        this.resFechaEvento = resFechaEvento || new Date();
        this.reCotiId = reCotiId || new Cotizacion(); // Elimina "new Reserva"
        this.usuId = usuId || new Usuario();
    }
}
