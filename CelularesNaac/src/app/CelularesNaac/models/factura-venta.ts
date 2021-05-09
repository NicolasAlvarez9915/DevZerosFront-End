import { DetalleFacturaVenta } from "./detalle-factura-venta";

export class FacturaVenta {
    codigo: string;
    fechaFactura: Date
    detallesFactura: DetalleFacturaVenta[];
    idInteresado: string;
    subtotal: number;
    iva: number;
    descuento: number
    total: number;
}
