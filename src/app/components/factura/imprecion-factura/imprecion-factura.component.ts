import {Component, Inject} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { BotonImpresionFacturaComponent, DialogData } from "../boton-impresion-factura/boton-impresion-factura.component";

@Component({
  selector: 'app-imprecion-factura',
  templateUrl: './imprecion-factura.component.html',
  styleUrls: ['./imprecion-factura.component.css']
})
export class ImprecionFacturaComponent  {

  constructor(
    public dialogRef: MatDialogRef<BotonImpresionFacturaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}
