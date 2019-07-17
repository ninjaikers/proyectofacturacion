import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FacturasComponent } from "../components/factura/facturas/facturas.component";
import { UsersComponent } from "../components/users/users.component";
import { FacturanuevaComponent } from "../components/factura/facturanueva/facturanueva.component";
import { FacturaactualizarComponent } from '../components/factura/facturaactualizar/facturaactualizar.component';
import { AppComponent } from '../app.component';

const routes: Routes = [
  {
    path:'',
    component:UsersComponent
  },
  {
    path:'facturas',
    component:FacturasComponent
  },
  {
    path:'facturas/factura-nueva',
    component:FacturanuevaComponent
  },
  {
    path:'facturas/factura-actualizar/:facturaNumero',
    component:FacturaactualizarComponent
  },
  {
    path:'usuario',
    component:UsersComponent
  },
  {
    path:'**',
    component:UsersComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
