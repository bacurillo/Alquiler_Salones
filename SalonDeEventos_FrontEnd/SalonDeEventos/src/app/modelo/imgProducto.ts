import { ProductoServicio } from "./producto-servicio";

export class ImgProducto {
    imgProdId: number;
    imgProdNombre: string;
    imgProdUrl: string;
    prodId:ProductoServicio;
    
    constructor(
        imgProdId?: number,
        imgProdNombre?: string,
        imgProdUrl?: string,
        prodId?: ProductoServicio

    ) {
        this.imgProdId = imgProdId||0;
        this.imgProdNombre = imgProdNombre || "";
        this.imgProdUrl = imgProdUrl || "";
        this.prodId = prodId || new ProductoServicio;
    }

}