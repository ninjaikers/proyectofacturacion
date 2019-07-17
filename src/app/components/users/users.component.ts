import { Component, OnInit } from '@angular/core';

//Importaciones necesarias para consumir el servicio de usuarios
import { SocialUser } from "angularx-social-login";
import { UsersService } from "../../services/users.service";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  //propiedad para almacenar el usuario
  private user: SocialUser;

  //inyectar servicio en el constructor
  constructor(private usersService: UsersService) { }

  ngOnInit() {
    this.usersService.user.subscribe((user) => {
      this.user = user;
    });
  }

  login(){
    this.usersService.signInWithGoogle();
  }

  logout(){
    this.usersService.signOut();
  }

}
