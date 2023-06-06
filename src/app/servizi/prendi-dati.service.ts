import { Injectable } from '@angular/core';
import PocketBase from 'pocketbase';

@Injectable({
  providedIn: 'root'
})
export class PrendiDatiService {
  pb: any;
  classi: any;
  studenti: any;

  constructor() {
    this.pb = new PocketBase('http://127.0.0.1:8090');
  }

  async prendiStudenti(): Promise<void> {
  try {
    const result = await this.pb.collection('Students').getList(1, 50);
    this.studenti = result.items;
    console.log("this.studenti");
    console.log(this.studenti);
  } catch (err) {
    console.log("Si è verificato un errore:", err);
  }
    return this.studenti;
  }

  async prendiClassi(): Promise<any[]> {
    try {
      const result = await this.pb.collection('Classes').getList(1, 50);
      this.classi = result;
      return this.classi;
    } catch (err) {
      console.log("Si è verificato un errore:", err);
      return []; // Restituisci un array vuoto in caso di errore
    }
  }

  async creaNuovoStudente(studente: any): Promise<any> {
    try {
      const record = await this.pb.collection('Students').create(studente);
    } catch (err) {
      console.log("Si è verificato un errore:", err);
      return []; // Restituisci un array vuoto in caso di errore
    }
  }

  async creaNuovaClasse(classe: any): Promise<any> {
    try {
      const record = await this.pb.collection('Classes').create(classe);
    } catch (err) {
      console.log("Si è verificato un errore:", err);
      return []; // Restituisci un array vuoto in caso di errore
    }
  }

  async eliminaStudente(id: any): Promise<any> {
    try {
      const record = await this.pb.collection('Students').delete(id);
    } catch (err) {
      console.log("Si è verificato un errore:", err);
      return []; // Restituisci un array vuoto in caso di errore
    }
  }

  async updateStudente(studente: any, id: any): Promise<any> {
    try {
      const record = await this.pb.collection('Students').update(id, studente);
    } catch (err) {
      console.log("Si è verificato un errore:", err);
      return []; // Restituisci un array vuoto in caso di errore
    }
  }

  studenteToId(nome: any, cognome: any, classeS: any){
    const studenteTrovato = this.studenti.items.find((studente:any) =>
      studente.name === nome &&
      studente.surname === cognome &&
      studente.classe === classeS
    );
    return studenteTrovato.id
  }

  classeToId(nome: any){
    const classeTrovata = this.classi.items.find((classe:any) =>
      classe.name === nome
    );
    return classeTrovata.id
  }

  ordinaClassi() {
    this.classi.items.sort((a:any, b:any) => a.name.localeCompare(b.name));
    return this.classi.items
  }

  prendiClassidaFiglio(){
    return this.classi
  }


}
