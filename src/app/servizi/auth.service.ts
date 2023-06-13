
import { Injectable } from '@angular/core';
import PocketBase from 'pocketbase';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private pb: PocketBase;

  constructor() {
    this.pb = new PocketBase('http://127.0.0.1:8090');
  }

  async login(email: string, password: string): Promise<boolean> {
    try {
      const authData = await this.pb.collection('users').authWithPassword(email,password);
      // Salva i dati di autenticazione nell'authStore di PocketBase
      return true;
    } catch (error) {
      console.error('Errore durante il login:', error);
      return false;
    }
  }

  logout() {
    // Esegui il logout, cancellando i dati di autenticazione dall'authStore di PocketBase
    this.pb.authStore.clear();
  }

  isLoggedin(): boolean {
    // Verifica se l'utente è attualmente autenticato

    console.log("utente LOGGATo");
    return this.pb.authStore.isValid;
  }

  getAuthToken(): string {
    // Ottieni il token di autenticazione corrente
    console.log(this.pb.authStore.token);
    return this.pb.authStore.token;
  }

  //getCurrentUserId(): string {
    // Ottieni l'ID utente corrente
   // return this.pb.authStore.model.id;
 // }
 async createUser(data: any): Promise<any> {
  try {
    const record = await this.pb.collection('Users').create(data);
    console.log('Utente creato:', record);
    return record;
  } catch (error) {
    console.error('Errore durante la creazione dell\'utente:', error);
    throw error;
  }
}

}
