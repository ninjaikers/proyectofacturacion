import { Injectable } from '@angular/core';
import { AuthService } from "angularx-social-login";
import { GoogleLoginProvider } from "angularx-social-login";
import { SocialUser } from "angularx-social-login";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  //propiedad observable para suscriberse desde los componentes
  user: Observable<SocialUser>;

  //constructor de la clase se le inyecta un servicio 'AuthService'
  constructor(private authService: AuthService) {
    this.user = authService.authState;
  }

  /**
   * Metodo para iniciar sesion con google
   */
  signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }

  /**
   * Metodo para cerrar la sesion de google
   */
  signOut(): void {
    this.authService.signOut();
  }
}
