import { Timestamp } from "rxjs";
import { Cotizacion } from "./cotizacion";
import { ProductoServicio } from "./producto-servicio";

export class Adicionales {
    adiId: number;
    cotiId: Cotizacion;
    prodId: ProductoServicio;
    adiCantidad: number;
    adiFechaRegistro: Date;

    constructor(
        adiId?: number,
        adiCantidad?: number,
        adiFechaRegistro?: Date,
        cotiId?: Cotizacion,
        prodId?: ProductoServicio,
    ) {
        this.adiId = adiId||0;
        this.adiCantidad = adiCantidad||0;
        this.adiFechaRegistro = adiFechaRegistro||new Date;
        this.cotiId = cotiId || new Cotizacion();
        this.prodId = prodId||new ProductoServicio();
    }

}


