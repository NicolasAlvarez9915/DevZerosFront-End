import { DispositivoMovil } from "./dispositivo-movil";
import { Proveedor } from "./proveedor";

export class SolicitudFacturaCompra {
    proveedor: Proveedor;
    dispositivos: DispositivoMovil[];
}
