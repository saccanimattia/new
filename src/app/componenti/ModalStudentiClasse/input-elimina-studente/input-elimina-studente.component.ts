import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PrendiDatiService } from '../../../servizi/prendi-dati.service';
import { ArrayServiceService } from '../../../servizi/array-service.service';


@Component({
  selector: 'app-input-elimina-studente',
  templateUrl: './input-elimina-studente.component.html',
  styleUrls: ['./input-elimina-studente.component.scss']
})
export class InputEliminaStudenteComponent {

  @Input() classeFrequentata: any
  @Input() students: any[] = []
  filteredArray: any[] = []
  persone: any[] = []
  i: any
  searchQuery: any
  @Output() buttonClick = new EventEmitter<void>();
  constructor(private servizio: PrendiDatiService, private arr: ArrayServiceService) {}

  openModale() {
    const modal = document.querySelector('#mEC');
    modal?.classList.add('show');
    modal?.setAttribute('style', 'display: block');
    this.filteredArray = this.students
    this.prendiPersone()
  }

  closeModale() {
    const modal = document.querySelector('#mEC');
    modal?.classList.remove('show');
    modal?.setAttribute('style', 'display: none');
    this.buttonClick.emit();

  }


  elimina(studente: any) {
    studente.classe = this.servizio.classeToId(this.classeFrequentata)
    studente.birthDate = new Date(studente.birthDate)
    this.servizio.eliminaStudente(this.servizio.studenteToId(studente.name, studente.surname, studente.classe))
  }

  deleteStudents(): void {
    for(let studente of this.students){
      console.log(studente)
      this.elimina(studente);
    }
    this.arr.eliminaStudentiClasse(this.students)
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
    for(let persona of this.filteredArray){
      this.persone.push(persona.name + " " + persona.surname + " " + persona.birthDate)
    }
  }
}
