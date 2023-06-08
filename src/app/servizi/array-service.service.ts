import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ArrayServiceService {


  allStudenti:any[] = []
  studentiClasse:any[] = []
  classi:any[] = []
  constructor() { }

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


}
