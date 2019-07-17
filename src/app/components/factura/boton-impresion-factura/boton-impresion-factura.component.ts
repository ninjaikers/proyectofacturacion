import {Component, Input, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { ImprecionFacturaComponent } from "../imprecion-factura/imprecion-factura.component";
import { FacturasService } from "../../../services/facturas.service";
import { FacturaModel } from "../../../models/facturaModel";
import { EncabezadoFacturaModel } from "../../../models/encabezadoFacturaModel";

export interface DialogData {
  animal: string;
  name: string;
  facturaNumero: number;
}

@Component({
  selector: 'app-boton-impresion-factura',
  templateUrl: './boton-impresion-factura.component.html',
  styleUrls: ['./boton-impresion-factura.component.css']
})
export class BotonImpresionFacturaComponent implements OnInit{

  animal: string= 'asdfasdf';
  name: string;
  @Input() facturaNumero: number;
  
  //propiedad para almacenar el listado de facturas
  factura: FacturaModel;

   //propiedad para almacenar el listado de facturas
   facturaEncabezado: EncabezadoFacturaModel = new EncabezadoFacturaModel();

  constructor(
    public dialog: MatDialog,
    private facturasService: FacturasService) {}

  ngOnInit(): void {
    this.getByFacturaNumero(Number(this.facturaNumero));
  }

  getByFacturaNumero(facturaNumero){
    this.facturasService.getByFacturaNumero(facturaNumero)
    .then((factura)=>{
      this.factura = Object(factura);
    })
    .catch((err)=>{
      console.log(err);
    });
  }


  openDialog(): void {
    const dialogRef = this.dialog.open(ImprecionFacturaComponent, {
      width: '500px',
      data: {factura : this.factura , facturaEncabezado : this.facturaEncabezado}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.animal = result;
    });
  }

  

}
