//Importaciones necesarias
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

//Importaciones para trabajar con interfaz grafica y formularios 
import {FormsModule} from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import {MatIconModule} from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatTableModule} from '@angular/material/table';
import {MatDialogModule} from '@angular/material/dialog';
import {MatMenuModule} from '@angular/material/menu';
import {MatCardModule} from '@angular/material/card';





//Importar modulos para el login con OAuth de Google
import { SocialLoginModule, AuthServiceConfig } from "angularx-social-login";
import { GoogleLoginProvider } from "angularx-social-login";

//Importar Modulo de Rutas
import { AppRoutingModule } from './routing/app-routing.module';



//Importar Componentes
import { AppComponent } from './app.component';
import { UsersComponent } from './components/users/users.component';
import { FacturasComponent } from './components/factura/facturas/facturas.component';
import { FacturanuevaComponent } from './components/factura/facturanueva/facturanueva.component';
import { FacturaactualizarComponent } from './components/factura/facturaactualizar/facturaactualizar.component';
import { ImprecionFacturaComponent } from './components/factura/imprecion-factura/imprecion-factura.component';
import { BotonImpresionFacturaComponent } from './components/factura/boton-impresion-factura/boton-impresion-factura.component';
import { BarraLateralComponent } from './barra-lateral/barra-lateral.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatSidenavModule, MatListModule } from '@angular/material';



//Configuracion del OAuth Client ID de Google
let config = new AuthServiceConfig([
  {
    id: GoogleLoginProvider.PROVIDER_ID,
    provider: new GoogleLoginProvider("158771094723-m7nhp9rqurfvc3t2rertj7eof851csod.apps.googleusercontent.com")
  }
]);
export function provideConfig() {
  return config;
}

//Modulo Principal - Clase AppModule
@NgModule({
  declarations: [
    AppComponent,
    UsersComponent,
    FacturasComponent,
    FacturanuevaComponent,
    FacturaactualizarComponent,
    ImprecionFacturaComponent,
    BotonImpresionFacturaComponent,
    BarraLateralComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SocialLoginModule,
    FormsModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    MatSelectModule,
    MatIconModule,
    MatToolbarModule,
    MatTableModule,
    MatDialogModule,
    LayoutModule,
    MatSidenavModule,
    MatListModule,
    MatMenuModule,
    MatCardModule
  ],
  entryComponents : [
    ImprecionFacturaComponent
  ],
  providers: [
    {
      provide: AuthServiceConfig,
      useFactory: provideConfig
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
