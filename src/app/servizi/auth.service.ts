import { Injectable } from '@angular/core';
import PocketBase from 'pocketbase';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private pb: PocketBase;
  utenti: any[] = [];
  utente: any;
  ruolo: any;
  permissions : any[] = []

  constructor() {
    this.pb = new PocketBase('http://127.0.0.1:8090');
  }

  async login(email: string, password: string): Promise<boolean> {
    try {
      const authData = await this.pb.collection('users').authWithPassword(email, password);
      return true;
    } catch (error) {
      console.error('Error during login:', error);
      return false;
    }
  }

  logout() {
    // Clear authentication data from the authStore of PocketBase
    this.pb.authStore.clear();
  }

  isLoggedIn(): boolean {
    // Check if the user is currently authenticated
    console.log("User logged in");
    return this.pb.authStore.isValid;
  }

  getAuthToken(): string {
    // Get the current authentication token
    console.log(this.pb.authStore.token);
    return this.pb.authStore.token;
  }

  async signup(data: any): Promise<any> {
    data.passwordConfirm = data.password;
    try {
      const record = await this.pb.collection('Users').create(data);
      console.log('User created:', record);
      await this.login(data.username, data.password); // await login before returning
    } catch (error) {
      console.error('Error creating user:', error);
      throw error;
    }
  }

  async fetchUsers(): Promise<any[]> {

    try {
      const result = await this.pb.collection('Users').getList(1, 50);
      console.log(result)
      this.utenti = result.items;
      return this.utenti;
    } catch (err) {
      console.log("An error occurred:", err);
      throw err;
    }
  }

  setRuolo(r : any, i : any){
    this.ruolo = r
    if(this.ruolo === 'preside'){
        this.permissions  = ['','classi','studenti','creaclasse']
        for(let ii = 1; ii < i; ii++){
          this.permissions.push('classe/' + ii)
        }
    }
    if(this.ruolo === 'professore'){
      this.permissions  = ['', 'classe' + i]
    }
    if(this.ruolo === ''){
      this.permissions  = ['']
    }
  }

  getPermission() {
    return this.permissions
  }


}
