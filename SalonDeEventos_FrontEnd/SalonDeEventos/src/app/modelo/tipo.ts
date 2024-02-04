import { ProductoServicio } from "./producto-servicio";

export class Tipo {

    tipId: number = 0;
    tipNombre: string = "";
    tipFechaRegistro: Date = new Date;

    constructor(
        tipId?: number,
        tipNombre?: string,
        tipFechaRegistro?: Date,
    ) {
        this.tipId = tipId || 0;
        this.tipNombre = tipNombre || "";
        this.tipFechaRegistro = tipFechaRegistro || new Date;
    }
}
