import { DetalleFacturaCompra } from "./detalle-factura-compra"

export class FacturaCompra {
    codigo: string;
    fechaFactura: Date
    detallesFactura: DetalleFacturaCompra[];
    idProveedor: string;
    subtotal: number;
    iva: number;
    descuento: number
    total: number;
}
