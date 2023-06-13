
import { Component } from '@angular/core';
import { AuthService } from '../../servizi/auth.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  username: string;
  password: string;
  loggedInUser:string = '';
  constructor(private authService: AuthService) {
    this.username = '';
    this.password = '';

  }

  login() {
    console.log(this.username);
    console.log(this.password);
    this.authService.login(this.username, this.password)
      .then((success) => {
        if (success) {
          // Login riuscito, puoi effettuare le azioni necessarie come reindirizzamento a un'altra pagina
            this.loggedInUser=this.username
            this.username = '';
            this.password = '';
          console.log('Login riuscito');
        } else {
          // Login fallito, puoi gestire l'errore o visualizzare un messaggio di errore
          console.log('Login fallito');
          this.username = '';
          this.password = '';
        }
      });
  }

  logout() {
    this.authService.logout();
    console.log('Logout effettuato');
  }
  isLoggedIn(): boolean{
  return this.authService.isLoggedin();
  }


}
