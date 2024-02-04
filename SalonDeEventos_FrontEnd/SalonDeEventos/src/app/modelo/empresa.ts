export class Empresa {

  empId: number;
  empNombre: string;
  empTelefono: string;
  empEmail: string;
  empFechaRegistro: Date;

  constructor(
    empId?: number,
    empNombre?: string,
    empTelefono?: string,
    empEmail?: string,
    empFechaRegistro?: Date
  ) {
    this.empId = empId || 0;
    this.empNombre = empNombre || "";
    this.empTelefono = empTelefono || "";
    this.empEmail = empEmail || "";
    this.empFechaRegistro = empFechaRegistro || new Date;
  }
}
