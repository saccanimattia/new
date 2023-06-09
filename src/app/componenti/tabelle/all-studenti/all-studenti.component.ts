import { Component, Input } from '@angular/core';
import { PrendiDatiService } from '../../../servizi/prendi-dati.service';
import { ArrayServiceService } from '../../../servizi/array-service.service';

@Component({
  selector: 'app-all-studenti',
  templateUrl: './all-studenti.component.html',
  styleUrls: ['./all-studenti.component.scss']
})
export class AllStudentiComponent {
    studentiClasse: any[] = [];
    classi: any[] = [];
    persone: any[] = [];
    cl: any[] = [];
    selectedStudents: any[] = [];
    c:any;
    classeId: any
    classe: any
    i = 0;
    constructor(private prendi: PrendiDatiService, private arr:ArrayServiceService) {

    }

    ngOnInit() {
      this.prendiClassi()
      this.prendiStudenti()
    }

    ngOnChange() {
      this.prendiClassi()
      this.prendiStudenti()
    }

    trasformaClassi(){
      for(let studente of this.filteredArray){
        if(studente.classe != '')
        studente.classe = this.prendi.idToClass(studente.classe, this.cl)
      }
    }

    async prendiStudenti(): Promise<void> {
        let a:any = await this.prendi.prendiStudenti()
        this.studentiClasse = a;
        this.filteredArray = this.studentiClasse
        this.trasformaClassi()
        this.prendiPersone();
        this.arr.inizializzaAllStudenti(this.studentiClasse)
    }

    async prendiClassi(): Promise<void> {
      try {

        let quarte: any = await this.prendi.prendiClassi();
        this.cl = quarte.items as any[]

      } catch (err) {
        console.log("Si è verificato un errore:", err);
      }
    }

    searchQuery: string = '';
    filteredArray: any[] = [];

    performSearch(): void {
      this.filteredArray = this.studentiClasse
      this.i = 0
      this.filteredArray = this.filteredArray.filter(item => {
        this.i = this.i+1
        return this.persone[this.i - 1].toLowerCase().includes(this.searchQuery.toLowerCase());
      });

    }


    prendiPersone(){
      for(let persona of this.filteredArray){
        this.persone.push(persona.name + " " + persona.surname + " " + persona.birthDate + " " + persona.classe)
      }
    }

    toggleStudentSelection(student: any): void {
      if (student.selected) {
        this.selectedStudents.push(student);
      } else {
        const index = this.selectedStudents.indexOf(student);
        if (index > -1) {
          this.selectedStudents.splice(index, 1);
        }
      }

    }

    modalChiuso(){

            console.log(this.studentiClasse)
      this.studentiClasse = this.arr.prendiAllStudenti()
      console.log(this.studentiClasse)

      this.trasformaNuoveClassi()
      console.log(this.studentiClasse)
      this.filteredArray = this.studentiClasse
      this.selectedStudents = [];
     }


     trasformaNuoveClassi(){
      console.log("ciao")
      console.log(this.cl)
      for(let s of this.studentiClasse){
        console.log(isNaN(parseInt(s.classe.charAt(0), 10)))
        if(parseInt(s.classe.charAt(0), 10) ){
          console.log("IUJTB3GNOIGJNP42")
          s.classe = this.prendi.idToClass(s.classe, this.cl)
          console.log(s.classe)
        }

      }
     }
}




