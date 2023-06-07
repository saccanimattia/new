import { Component, Input } from '@angular/core';
import { PrendiDatiService } from 'src/app/servizi/prendi-dati.service';

@Component({
  selector: 'app-input-elimina-all-studenti',
  templateUrl: './input-elimina-all-studenti.component.html',
  styleUrls: ['./input-elimina-all-studenti.component.scss']
})
export class InputEliminaAllStudentiComponent {
  @Input() classeFrequentata: any
  @Input() students: any[] = []
  filteredArray: any[] = []
  persone: any[] = []
  i: any
  searchQuery: any
  constructor(private servizio: PrendiDatiService) {}

  openModale() {

    const modal = document.querySelector('.modalElimina');
    modal?.classList.add('show');
    modal?.setAttribute('style', 'display: block');
    this.filteredArray = this.students
    this.prendiPersone()
  }

  closeModale() {
    const modal = document.querySelector('.modalElimina');
    modal?.classList.remove('show');
    modal?.setAttribute('style', 'display: none');
  }


  elimina(studente: any) {
    if(studente.classe != '')
      studente.classe = this.servizio.classeToId(studente.classe)
    studente.birthDate = new Date(studente.birthDate)
    this.servizio.eliminaStudente(this.servizio.studenteToId(studente.name, studente.surname, studente.classe))
  }

  deleteStudents(): void {
    for(let studente of this.students){
      this.elimina(studente);
    }
    this.closeModale();
  }

  performSearch(): void {
    this.filteredArray = this.students
    this.i = 0
    this.filteredArray = this.filteredArray.filter(item => {
      this.i = this.i+1
      return this.persone[this.i - 1].toLowerCase().includes(this.searchQuery.toLowerCase());
    });
  }

  prendiPersone(){
    console.log("ifb")
    for(let persona of this.filteredArray){
      console.log("persona")
      console.log(persona)
      this.persone.push(persona.name + " " + persona.surname + " " + persona.birthDate)
    }
  }
}