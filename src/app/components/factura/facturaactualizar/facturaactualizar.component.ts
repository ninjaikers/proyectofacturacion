import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from "@angular/router";
import { FacturasService } from "../../../services/facturas.service";
import { FacturaModel } from 'src/app/models/facturaModel';
import { ArticuloModel } from 'src/app/models/articuloFacturaModel';
import { UsersService } from "../.././/../services/users.service";
import { SocialUser } from "angularx-social-login";

@Component({
  selector: 'app-facturaactualizar',
  templateUrl: './facturaactualizar.component.html',
  styleUrls: ['./facturaactualizar.component.css']
})
export class FacturaactualizarComponent implements OnInit {

  //propiedad para almacenar el usuario
  private user: SocialUser;

  //propiedad para almacenar el listado de facturas
  factura: any;
  facturaNumero;

  //almacena el modelo de los articulos
  articulo:ArticuloModel = new ArticuloModel();

  //almacena el listado de articulos
  articulos = [];

  //almacena los valores posibles para el tipo de documento
  tiposDocumento = [
    {valor:'v', muestraValor:'Natural'},
    {valor:'j', muestraValor:'Juridica'}
  ];
  //indica el tipo de persona que esta seleccionada por defecto 'v' 

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private facturasService: FacturasService,
    private usersService: UsersService
  ) { }

  ngOnInit() {
    this.usersService.user.subscribe((user) => {
      this.user = user;
    });
    
    this._route.params.subscribe((params: Params)=>{
      this.facturaNumero = Number(params.facturaNumero);
    });

    this.getByFacturaNumero(this.facturaNumero);
  }

  getByFacturaNumero(facturaNumero){
    this.facturasService.getByFacturaNumero(facturaNumero)
    .then((factura)=>{
      this.factura = factura;
      this.articulos = this.factura.articulos;
      console.log(this.factura);
    })
    .catch((err)=>{
      console.log(err);
    });
  }



  actualizar() {

    if (!this.hayRegistros()) {
      window.alert('Para facturar debe agregar al menos un producto');
      return;
    }

    this.factura.articulos = this.articulos;
    
    this.facturasService.updateFactura(this.factura).then(()=>{
    this.articulos = [];
    this._router.navigate(['/facturas']);
    });
   
  }



  getTotalIva(){
    var total=0;
    for (let index = 0; index < this.articulos.length; index++) {
      total += Number(this.articulos[index].articuloIVA) * Number(this.articulos[index].articuloCantidad);
      
    }
    
    return total;
  }

  getSubTotal(){
    var total=0;
    for (let index = 0; index < this.articulos.length; index++) {
      total += Number(this.articulos[index].articuloPrecio) * Number(this.articulos[index].articuloCantidad);
      
    }
    return total;
  }

  getTotal(){
    var total = Number(this.getTotalIva()) + Number(this.getSubTotal());
    return total;
  }


//////////////////////////////

agregar() {     

  //calcula el IVA (Precio Articulo * Tasa) / 100
  this.articulo.articuloIVA = this.getIvaArticulo();

  //calcula el precio total (IVA + PrecioArticulo ) * Cantidad
  this.articulo.articuloPrecioTotal = this.getPrecioTotalArticulo();

  this.articulo.articuloCodigo ++; 
  

  //agrega los articulos al listado
  this.articulos.push( 
    {
      articuloDescripcion : this.articulo.articuloDescripcion ,
      articuloPrecioTotal : this.articulo.articuloPrecioTotal ,
      articuloCantidad : this.articulo.articuloCantidad ,
      articuloPrecio : this.articulo.articuloPrecio ,
      articuloIVA : this.articulo.articuloIVA,
      articuloTasa : this.articulo.articuloTasa ,
      articuloCodigo : this.articulo.articuloCodigo ,
    }
  );
  
  this.factura.facturaIVATotal  = this.getTotalIva();
  this.factura.facturaSubTotal  = this.getSubTotal();
  this.factura.facturaPrecioTotal  = this.getTotal();

  //limpiar los campos
  this.articulo.articuloDescripcion=null; 

}

  borrar(articulo) {
    for(let x=0;x<this.articulos.length;x++)
      if (this.articulos[x].articuloCodigo==articulo.articuloCodigo)
      {
        this.articulos.splice(x,1);
        this.factura.facturaIVATotal  = this.getTotalIva();
        this.factura.facturaSubTotal  = this.getSubTotal();
        this.factura.facturaPrecioTotal  = this.getTotal();
        return;
      }
  }

  hayRegistros() {
    return this.articulos.length>0;              
  }

  getIvaArticulo(){
    return (Number(this.articulo.articuloPrecio)  *  Number(this.articulo.articuloTasa)) / 100;
  }

  getPrecioTotalArticulo(){
    return (
      this.getIvaArticulo() + Number(this.articulo.articuloPrecio) 
    ) * this.articulo.articuloCantidad;
  }

}
