import {
  Component,
  OnInit
} from '@angular/core';
import {
  FacturasService
} from 'src/app/services/facturas.service';
import {
  ArticuloModel
} from "../../../models/articuloFacturaModel";
import {
  FacturaModel
} from "../../../models/facturaModel";
import {
  UsersService
} from "../.././/../services/users.service";
import {
  SocialUser
} from "angularx-social-login";


@Component({
  selector: 'app-facturanueva',
  templateUrl: './facturanueva.component.html',
  styleUrls: ['./facturanueva.component.css']
})
export class FacturanuevaComponent implements OnInit {

  //propiedad para almacenar el usuario
  private user: SocialUser;

  //almacen el modelo de la factura
  factura = new FacturaModel();

  //almacena el numero de facutra que corresponde facturar
  facturaActual: any;


  //almacena los valores posibles para el tipo de documento
  tiposDocumento = [{
      valor: 'v',
      muestraValor: 'Natural'
    },
    {
      valor: 'j',
      muestraValor: 'Juridica'
    }
  ];
  //indica el tipo de persona que esta seleccionada por defecto 'v' 
  tipoPersonaSelected: string = this.tiposDocumento[0].valor;

  //almacena el modelo de los articulos
  articulo = new ArticuloModel();

  //almacena el listado de articulos
  articulos = [];

  /** 
   * Constructor de la clase.
   * Inyecta un servicio FacuraService para utilizar los metodos del servicio
   */
  constructor(private facturaService: FacturasService, private usersService: UsersService) {}

  /**
   * Al llamar al componente inicializa el numero de factura actual
   */
  ngOnInit() {
    this.usersService.user.subscribe((user) => {
      this.user = user;
    });
    this.facturaActual = this.getFacturaActual();
  }


  /////////////////////////////////////////////////////////////
  /////   METODOS UTILIZADOS PARA LAS FACTURAS   //////////////
  /////////////////////////////////////////////////////////////

  /**
   * Metodo obtiene el numero de factura actual
   */
  getFacturaActual() {
    this.facturaService.getTotalFacturas()
      .then((datos) => {

        this.facturaActual = < number > datos + 1;

      })
      .catch((err) => {
        console.log(err);
      });

  }

  /**
   * Metodo que realiza la facturacion
   */
  facturar() {
    if (this.facturaActual == undefined) {
      this.facturaActual = 1;
    }

    if (!this.hayRegistros()) {
      window.alert('Para facturar debe agregar al menos un producto');
      return;
    }



    this.factura.facturaClienteTipo = this.tipoPersonaSelected;
    this.factura.facturaFechaHora = new Date();
    this.factura.facturaNumero = this.facturaActual;
    this.factura.facturaVendedor = this.user.name;
    this.factura.facturaStatus = 'activa';
    this.factura.articulos = this.articulos;

    this.facturaService.addFactura(this.factura).then(() => {
      this.facturaActual = this.getFacturaActual();
      this.articulos = [];
      this.factura.facturaClienteDocumento = null;
      this.factura.facturaClienteDireccion = null;
      this.factura.facturaClienteNombre = null;
    });

  }

  getTotalIva() {
    var total = 0;
    for (let index = 0; index < this.articulos.length; index++) {
      total += Number(this.articulos[index].articuloIVA) * Number(this.articulos[index].articuloCantidad);

    }

    return total;
  }

  getSubTotal() {
    var total = 0;
    for (let index = 0; index < this.articulos.length; index++) {
      total += Number(this.articulos[index].articuloPrecio) * Number(this.articulos[index].articuloCantidad);

    }
    return total;
  }

  getTotal() {
    var total = Number(this.getTotalIva()) + Number(this.getSubTotal());
    return total;
  }


  //////////////////////////////////////////////////////////////
  //////   METODOS UTILIZADOS PARA LOS ARTICULOS   /////////////
  //////////////////////////////////////////////////////////////



  hayRegistros() {
    return this.articulos.length > 0;
  }


  agregar() {

    //calcula el IVA (Precio Articulo * Tasa) / 100
    this.articulo.articuloIVA = this.getIvaArticulo();

    //calcula el precio total (IVA + PrecioArticulo ) * Cantidad
    this.articulo.articuloPrecioTotal = this.getPrecioTotalArticulo();

    this.articulo.articuloCodigo++;


    //agrega los articulos al listado
    this.articulos.push({
      articuloDescripcion: this.articulo.articuloDescripcion,
      articuloPrecioTotal: this.articulo.articuloPrecioTotal,
      articuloCantidad: this.articulo.articuloCantidad,
      articuloPrecio: this.articulo.articuloPrecio,
      articuloIVA: this.articulo.articuloIVA,
      articuloTasa: this.articulo.articuloTasa,
      articuloCodigo: this.articulo.articuloCodigo,
    });

    this.factura.facturaIVATotal = this.getTotalIva();
    this.factura.facturaSubTotal = this.getSubTotal();
    this.factura.facturaPrecioTotal = this.getTotal();

    //limpiar los campos
    this.articulo.articuloDescripcion = null;
    this.articulo.articuloCantidad = null;
    this.articulo.articuloTasa = null;
    this.articulo.articuloPrecio = null;

  }

  borrar(articulo) {
    for (let x = 0; x < this.articulos.length; x++)
      if (this.articulos[x].articuloCodigo == articulo.articuloCodigo) {
        this.articulos.splice(x, 1);
        this.factura.facturaIVATotal = this.getTotalIva();
        this.factura.facturaSubTotal = this.getSubTotal();
        this.factura.facturaPrecioTotal = this.getTotal();
        return;
      }
  }

  getIvaArticulo() {
    return (Number(this.articulo.articuloPrecio) * Number(this.articulo.articuloTasa)) / 100;
  }

  getPrecioTotalArticulo() {
    return (
      this.getIvaArticulo() + Number(this.articulo.articuloPrecio)
    ) * this.articulo.articuloCantidad;
  }



}
