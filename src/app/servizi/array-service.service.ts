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
    console.log(x)
    console.log("x")
    for(let xx of x){
      let isElim = false;
    this.allStudenti = this.allStudenti.filter(item => {
      if(item.name == xx.name && item.surname == xx.surname && item.classe == xx.classe && item.birthDate == xx.birthDate && isElim == false){
        isElim = true;
        return false;
      }
      return true;
    });
    }
    console.log("allStudenti")
    console.log(this.allStudenti)
  }

  eliminaStudentiClasse(x:any[]){
    for(let xx of x){
      console.log(xx)
      let isElim = false;
      this.studentiClasse = this.studentiClasse.filter(item => {
      if(item.name == xx.name && item.surname == xx.surname && isElim == false){
        console.log("fatto")
        isElim = true;
        return false;
      }
      return true;
    });
    }
    console.log(this.studentiClasse)
    return this.studentiClasse
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
    this.allStudenti.push(x);
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
          isUp = true;
          item.name = xx.name
          return xx;
      }
      return true;
    });
  }

  updateAllStudenti(x:any, xx:any){
    let isUp = false;
    this.allStudenti = this.allStudenti.filter(item => {
        if((item.name == x.name && item.surname == x.surname) && isUp == false){
          isUp = true;
          item.name = xx.name
          item.surname = xx.surname
          item.classe = xx.classe
          item.dateBirth = xx.dateBirth

          return xx;
      }
      return true;
    });

  }

  updateStudenteClasse(x:any, xx:any){
    let isUp = false;
    this.studentiClasse = this.studentiClasse.filter(item => {
      console.log(item)
      console.log(x.classe)
        if((item.name === x.name && item.surname === x.surname) && isUp == false){
          console.log(x.classe)
          isUp = true;
          item.name = xx.name
          item.surname = xx.surname
          item.dateBirth = xx.dateBirth
          if(x.classe == xx.classe){
            console.log("ciao")
            return xx;
          }
          else{
            return false;
          }
      }
      return true;
    });
  }

  updateStudenteClasseCrea(x:any[], classe:any){
    this.aggiungiStudentiClasse(x)
  }


}
