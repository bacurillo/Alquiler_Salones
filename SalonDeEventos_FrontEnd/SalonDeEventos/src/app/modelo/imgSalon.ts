import { Salon } from "./salon";

export class ImgSalon {
    imgSalId: number|undefined;
    imgSalNombre: string;
    imgSalUrl: string;
    salId: Salon;
    
    constructor(
        imgSalId?: number,
        imgSalNombre?: string,
        imgSalUrl?: string,
        salId ?: Salon

    ) {
        this.imgSalId = imgSalId;
        this.imgSalNombre = imgSalNombre || "";
        this.imgSalUrl = imgSalUrl || "";
        this.salId = salId || new Salon;
    }

}