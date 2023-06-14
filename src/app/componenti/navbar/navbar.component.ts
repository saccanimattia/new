import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/servizi/auth.service';
import { PrendiDatiService } from 'src/app/servizi/prendi-dati.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  username: any;
  password: any;
  signupUsername: any;
  signupPassword: any;
  signupEmail: any;
  loggedInUser: any = '';
  ruolo : any
  x : any
  v : any[] = []
  utente:any
  classi: any[] = []
  id: any

  constructor(private authService: AuthService ,private servizio: PrendiDatiService,private router: Router) {

  }


  openModale() {
    const modal = document.querySelector('#loginModal');
    modal?.classList.add('show');
    modal?.setAttribute('style', 'display: block');
  }

  closeModale() {
    const modal = document.querySelector('#loginModal');
    modal?.classList.remove('show');
    modal?.setAttribute('style', 'display: none');
  }

  async login() {
    console.log(this.username);
    console.log(this.password);
    this.authService.login(this.username, this.password)
      .then((success) => {
        if (success) {
          localStorage.setItem('loggedInUser', this.username);
          this.loggedInUser = localStorage.getItem('loggedInUser');
          this.username = '';
          this.password = '';
          console.log('Login riuscito');
          this.assegnaruolo()
          if(this.ruolo=='professore')
            this.assegnaIdLink()
        } else {
          console.log('Login fallito');
          this.username = '';
          this.password = '';
        }
      })
      .catch((error) => {
        console.error('Error during login:', error);
        // Display an error message to the user
      });
    this.closeModale();


  }
  async assegnaruolo(){
    this.x = await this.authService.fetchUsers()
    console.log(this.x)
    this.v  = this.x
    console.log("cerca ruolo")
    this.ruolo = this.cercaRuolo()
    localStorage.setItem('ruolo', this.ruolo);
    localStorage.setItem('class', this.utente.classe);

    console.log("uij4rk23pfu5t")
    console.log(localStorage.getItem('ruolo'))
  }

    cercaRuolo() {
      console.log(this.v)
      if (this.v) {
        this.utente= this.v.find((u: any) => u.username === this.loggedInUser);
        console.log(this.utente.role)
        return this.utente.role;
      }
      return null;
    }

    async prendiClassi(): Promise<void> {
      try {
        let quarte: any = await this.servizio.prendiClassi();
        this.classi = quarte.items as any[];
        console.log(this.classi)
        this.id = this.trovaId()
      } catch (err) {
        console.log("Si è verificato un errore:", err);
      }
    }

  async assegnaIdLink() {
    await this.prendiClassi();
    this.utente.classe = this.servizio.classeToId(this.utente.classe);
  }

  async visualizza() {
    await this.prendiClassi();
    console.log("this.trovaId()");
    console.log(this.id);
    const classeId = this.id;
    this.router.navigate(['/classe', classeId]);
  }

  trovaId(){
    console.log("eiieiieieieieieiee")
    console.log(this.classi)
    console.log(localStorage.getItem('class'))
    let aaa = localStorage.getItem('class')
    let i = 0
    for(let cl of this.classi){
      i++
      if(cl.id == aaa){
        this.authService.setRuolo(this.ruolo,i)
        return i
      }


    }
    this.authService.setRuolo(this.ruolo,this.classi.length)
    return 0

  }


  logout() {
    this.authService.logout();
    this.loggedInUser = '';
    this.ruolo = ''
    localStorage.setItem('loggedInUser', '');
    localStorage.setItem('ruolo', '');
    localStorage.setItem('class', '');
    console.log('Logout effettuato');
    this.router.navigate(['']);
  }

  isLoggedIn(): boolean {
    this.loggedInUser = localStorage.getItem('loggedInUser');

    console.log(this.loggedInUser);

    return this.authService.isLoggedIn();
  }

  isPreside(): boolean {
    this.ruolo = localStorage.getItem('ruolo');

    console.log(this.ruolo);

    if(this.ruolo === 'preside')
      return true;
    return false;
  }

  isProfessore(): boolean {
    this.ruolo = localStorage.getItem('ruolo');

    console.log(this.ruolo);

    if(this.ruolo === 'professore')
      return true;
    return false;
  }



  openModalee() {
    const modal = document.querySelector('#signupModal');
    modal?.classList.add('show');
    modal?.setAttribute('style', 'display: block');
  }

  closeModalee() {
    const modal = document.querySelector('#signupModal');
    modal?.classList.remove('show');
    modal?.setAttribute('style', 'display: none');
  }

  signup() {
    console.log(this.signupUsername);
    console.log(this.signupPassword);
    console.log(this.signupEmail);
    let user = {
      username: this.signupUsername,
      password: this.signupPassword,
      email: this.signupEmail,
      role: 'professore'
    };
    this.authService.signup(user)
      .then((success) => {
        if (success) {
          this.loggedInUser = this.signupUsername;
          this.signupUsername = '';
          this.signupPassword = '';
          this.signupEmail = '';
          console.log('Signup riuscito');
        } else {
          console.log('Signup fallito');
          this.signupUsername = '';
          this.signupPassword = '';
          this.signupEmail = '';
        }
      })
      .catch((error) => {
        console.error('Error during signup:', error);
        // Display an error message to the user
      });
    this.closeModalee();
  }
}
