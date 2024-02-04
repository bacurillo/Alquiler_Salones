import { ProductoServicio } from '../modelo/producto-servicio';
import { Tipo } from '../modelo/tipo';
import { Categoria } from '../modelo/categoria';

export const PRODUCTOS: ProductoServicio[] = [
    {prodId: 1, prodNombre: '', prodPrecio: 2.50 , prodDescripcion: '', prodEstado: 1, prodFechaRegistro: new Date('2023-01-01'), catId: new Categoria(1), tipId: new Tipo(1) }

];