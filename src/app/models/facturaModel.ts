import { ArticuloModel } from "./articuloFacturaModel";

export class FacturaModel {    

    //indica el numero de factura
    //en el addFactura este campo es automatico e incremental
    public facturaNumero: number= null;
    public facturaStatus: string= null;

    //propiedades para almacenar la hora y fecha que se emite la factura
    public facturaFechaHora: Date = null;                  

    //propiedades del cliente de la factura
    public facturaClienteTipo: string  = null;   
    public facturaClienteDocumento: string  = null;   
    public facturaClienteNombre: string  = null;   ;    
    public facturaClienteDireccion: string  = null; 
    public facturaVendedor: string  = null;   

    //propiedades referentes a los articulos
    public articulos: Array<ArticuloModel> = null;    //ejemplo:  listado de articulos 
    public facturaPrecioTotal: number  = null;  
    public facturaSubTotal: number  = null;  
    public facturaIVATotal: number  = null;  

    constructor() {}
}

