import { Injectable } from '@angular/core';
import { PrendiDatiService } from './prendi-dati.service';

@Injectable({
  providedIn: 'root'
})
export class ArrayServiceService {


  allStudenti:any[] = []
  studentiClasse:any[] = []
  classi:any[] = []
  constructor(private servizio: PrendiDatiService) { }

  inizializzaAllStudenti(x:any[]){
    this.allStudenti = x
  }

  inizializzaStudentiClasse(x:any[]){
    this.studentiClasse = x
  }

  inizializzaClassi(x:any[]){
    this.classi = x
  }

  prendiAllStudenti(){
    return this.allStudenti
  }

  prendiStudentiClasse(){
    return this.studentiClasse
  }

  prendiClassi(){
    return this.classi
  }


  eliminaAllStudenti(x:any[]){
    console.log("ciao")
    console.log(x)
    for(let xx of x){
      let isElim = false;
    this.allStudenti = this.allStudenti.filter(item => {
      if(item.name != xx.name && item.surname != xx.surname && item.classe != xx.classe && item.birthDate != xx.birthDate && isElim == false){
        isElim = true;
        return true;
      }
      return false;
    });
    }
  }

  eliminaStudentiClasse(x:any[]){
    for(let xx of x){
      let isElim = false;
      this.studentiClasse = this.studentiClasse.filter(item => {
      if(item == xx && isElim == false){
        isElim = true;
        return false;
      }
      return true;
    });
    }
  }

  eliminaClassi(x:any[]){
    let isElim = false;
    for(let xx of x){
      let isElim = false;
      this.classi = this.classi.filter(item => {

        if(item == xx  && isElim == false){
        isElim = true;
        return false;
      }
      return true;
    });
    }

  }

  aggiungiClasse(x:any){
    this.classi.push(x);
  }

  aggiungiAllStudenti(x:any){
    console.log("agg")
    console.log(x)
    this.allStudenti.push(x);
    console.log("agg")
    console.log(this.allStudenti)
    console.log(this.allStudenti[this.allStudenti.length-1])

  }

  aggiungiStudentiClasse(x:any){
    for(let xx of x){
      this.studentiClasse.push(xx);
    }
  }

  updateClassi(x:any, xx:any){
    let isUp = false;
    this.classi = this.classi.filter(item => {
        if(item.name == x.name  && isUp == false){
          console.log("qwertyuiop")
          isUp = true;
          item.name = xx.name
          console.log(item.name)
          return xx;
      }
      return true;
    });
    console.log(this.classi)
  }

  updateAllStudenti(x:any, xx:any){
    console.log("y")
    console.log(x)
    console.log("xx")
    console.log(xx)
    let isUp = false;
    console.log(x)
    console.log(xx)
    this.allStudenti = this.allStudenti.filter(item => {
      console.log(item)
        if((item.name == x.name && item.surname == x.surname) && isUp == false){
          console.log("qwertyuiop")
          isUp = true;
          item.name = xx.name
          item.surname = xx.surname
          item.classe = xx.classe
          item.dateBirth = xx.dateBirth
          console.log(item.name)
          console.log(item.surname)
          return xx;
      }
      return true;
    });
    console.log("this.allStudenti")
    console.log(this.allStudenti)
  }

  updateStudenteClasse(x:any, xx:any){
    let isUp = false;

    this.studentiClasse = this.studentiClasse.filter(item => {
      console.log(item)
        if((item.name == x.name && item.surname == x.surname) && isUp == false){
          console.log("qwertyuiop")
          isUp = true;
          item.name = xx.name
          item.surname = xx.surname
          item.classe = xx.classe
          item.dateBirth = xx.dateBirth
          console.log(item.name)
          console.log(item.surname)
          return xx;
      }
      return true;
    });
  }

  updateStudenteClasseCrea(x:any[], classe:any){
    this.aggiungiStudentiClasse(x)
  }


}