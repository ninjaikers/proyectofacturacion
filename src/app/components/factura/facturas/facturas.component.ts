import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';






//Importaciones necesarias para consumir el servicio de usuarios
import { SocialUser } from "angularx-social-login";
import { UsersService } from "../../../services/users.service";
import { FacturasService } from 'src/app/services/facturas.service';


@Component({
  selector: 'app-facturas',
  templateUrl: './facturas.component.html',
  styleUrls: ['./facturas.component.css']
})
export class FacturasComponent implements OnInit {

 

  //propiedad para almacenar el usuario
  user: SocialUser;

  //propiedad para almacenar el listado de facturas
  allFacturas: any;

  displayedColumns: string[] = ['facturaNumero', 'cliente', 'total', 'actualizar', 'eliminar', 'imprimir'];

  //inyectar servicio en el constructor
  constructor(private usersService: UsersService, private facturasService: FacturasService) { }

  ngOnInit() {
    this.usersService.user.subscribe((user) => {
      this.user = user;
    });

    this.getAllFacturas();
  }

  

  hayRegistros() {
    var contador= 0; 
    for (let index = 0; index < this.allFacturas.length; index++) {
      if (this.allFacturas[index].facturaStatus=='activa') {
        contador++;
      }
      
    }
    return contador;              
  }

  addFactura(){
    this.facturasService.addFactura().then(()=>{});
    
  }
  
  getTotalFacturas(){
    this.facturasService.getTotalFacturas();
  }


  deleteFactura(factura){
    this.facturasService.deleteFactura(factura);
  }

  
  getAllFacturas(){
    this.facturasService.getAllFacturas()
    .then((datos)=>{
      this.allFacturas = datos;
    })
    .catch((err)=>{
      console.log(err);
    });
  }
  
  

}

