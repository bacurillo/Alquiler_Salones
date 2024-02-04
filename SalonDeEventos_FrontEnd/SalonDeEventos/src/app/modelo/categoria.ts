export class Categoria {
    catId: number;
    catNombre: string;
    catFechaRegistro: Date;

    constructor(
        catId?: number,
        catNombre?: string,
        catFechaRegistro?: Date) {
        this.catId = catId || 0;
        this.catNombre = catNombre || "";
        this.catFechaRegistro = catFechaRegistro || new Date;
    }
}
