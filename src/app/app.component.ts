import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params } from "@angular/router";

//Importaciones necesarias para consumir el servicio de usuarios
import { SocialUser } from "angularx-social-login";
import { UsersService } from './services/users.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  //titulo del sistema
  title = 'Sistema de Facturacion ';

  //almacena el usuario
  private user: SocialUser;

  //constructor inyecta el servicio para el usuario
  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private usersService: UsersService
  ) {}

  //se suscribe al observable para saber el status del usuario
  ngOnInit() {
    this.usersService.user.subscribe((user) => {
      this.user = user;
    });
  }

  logOut() {
    this.usersService.signOut();
    this._router.navigate(['/usuario']);
  }

 
}
