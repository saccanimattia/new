import { Injectable } from '@angular/core';
import PocketBase from 'pocketbase';

@Injectable({
  providedIn: 'root'
})
export class PrendiDatiService {
  pb: any;
  classi: any[] = [];
  studenti: any;

  constructor() {
    this.pb = new PocketBase('http://127.0.0.1:8090');
  }

  async prendiStudenti() {
      this.pb.collection('Students').getList(1, 50)
        .then((result: any) => {
        this.studenti = result;
      })
      .catch((err: any) => {
        console.log("Something went wrong:", err);
      });
      return this.studenti
  }

  async prendiClassi(): Promise<any[]> {
    try {
      const result = await this.pb.collection('Classes').getList(1, 50);
      this.classi = result;
      console.log(this.classi);
      return this.classi;
    } catch (err) {
      console.log("Si è verificato un errore:", err);
      return []; // Restituisci un array vuoto in caso di errore
    }
  }
}
