import { Cotizacion } from "./cotizacion";
import { Empresa } from "./empresa";

export class Salon {

    salId: number ;
    salNombre: string;
    salDireccion: string;
    salCapacidad: number;
    salCostoHora: number;
    salEstado: number;
    salLongitud: number;
    salLatitud: number;
    salFechaRegistro: Date;
    empId: Empresa;

    constructor(
        salId?: number,
        salNombre?: string,
        salDireccion?: string,
        salCapacidad?: number,
        salCostoHora?: number,
        salEstado?: number,
        salLongitud?: number,
        salLatitud?: number,
        salFechaRegistro?: Date,
        empId?: Empresa
    ) {
        this.salId = salId || 0;
        this.salNombre = salNombre || "";
        this.salDireccion = salDireccion || "";
        this.salCapacidad = salCapacidad || 0;
        this.salCostoHora = salCostoHora || 0;
        this.salEstado = salEstado || 0;
        this.salLongitud = salLongitud || 0;
        this.salLatitud = salLatitud || 0;
        this.salFechaRegistro = salFechaRegistro || new Date();
        this.empId = empId || new Empresa(); // Elimina "new Salon"
    }
}
