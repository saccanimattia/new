import { Injectable } from '@angular/core';
import PocketBase from 'pocketbase';
import { MatTable } from '@angular/material/table';
import { MatRowDef } from '@angular/material/table';

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

  async eliminaClasse(id: any): Promise<any> {
    try {
      const record = await this.pb.collection('Classes').delete(id);
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

  async updateClasse(classe: any, id: any): Promise<any> {
    try {
      const record = await this.pb.collection('Classes').update(id, classe);
    } catch (err) {
      console.log("Si è verificato un errore:", err);
      return []; // Restituisci un array vuoto in caso di errore
    }
  }

  studenteToId(nome: any, cognome: any, classeS: any){

    const studenteTrovato = this.studenti.find((studente:any) =>
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


  idToClass(id: any, cl: any){
    const classeTrovata = cl.find((classe:any) =>
      classe.id === id
    );
    if(classeTrovata == undefined){
      console.log(id)
      return id

    }

    return classeTrovata.name
  }

  ordinaClassi() {
    this.prendiClassi()
    this.classi.items.sort((a:any, b:any) => a.name.localeCompare(b.name));
    return this.classi.items
  }


}
