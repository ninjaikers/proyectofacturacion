

export class EncabezadoFacturaModel {
    /**
     * Para efectos practicos del ejercicio se inicializaron los campos desde el mismo modelo;
     */
    //propiedades del encabezado de la factura
    public encabezadoEnteRegulador: string = 'SENIAT';
    public encabezadoRIFEmpresa: string    = 'J-55555555-5';    
    public encabezadoNombreEmpresa: string = 'ejemplo:  empresa 555 S.A';
    public encabezadoTelefono: string      = '0212-12312234';
    public encabezadoDireccion: string     = 'Av. La Avenida, CC El Centro, Edificio El Gran Edificio, PB, URB. La Gran Urb, Altamira, Miranda';
    

    constructor() {}
}