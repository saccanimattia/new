import { Component, Input } from '@angular/core';
import { PrendiDatiService } from 'src/app/servizi/prendi-dati.service';


@Component({
  selector: 'app-input-nuovo-studente',
  templateUrl: './input-nuovo-studente.component.html',
  styleUrls: ['./input-nuovo-studente.component.scss']
})
export class InputNuovoStudenteComponent{
  studente:any = {
    name: 'nome',
    surname: 'cognome',
    classe: 'classe',
  };
  items: any[] = []
  selectedOption: string = 'new';
  selectedStudents: any[] = [];
  @Input() classeFrequentata: any
  testo = "scegli dall'elenco"
  filteredArray: any[] = []
  persone: any[] = []
  i: any
  searchQuery: any

  constructor(private servizio:PrendiDatiService){}

  ngOnInit(){
  }


  openModal() {
    this.prendiStudenti()
    this.selectedStudents.length = 0;
    const modal = document.querySelector('.modalNuovo');
    modal?.classList.add('show');
    modal?.setAttribute('style', 'display: block');
  }

  closeModal() {
    const modal = document.querySelector('.modalNuovo');
    modal?.classList.remove('show');
    modal?.setAttribute('style', 'display: none');
  }


  saveClass() {
    if (this.selectedOption === 'new') {
      this.studente.classe = this.servizio.classeToId(this.classeFrequentata)
      this.studente.birthDate = new Date(this.studente.birthDate)
      this.servizio.creaNuovoStudente(this.studente)
    } else if (this.selectedOption === 'existing') {
      this.modifica()
      }




    this.items.forEach(item => item.selected = false);
    this.selectedOption = 'new';
    this.closeModal();
  }

  async prendiStudenti(): Promise<void> {
    let a:any = await this.servizio.prendiStudenti()
    this.items = a.filter((studente: any) => studente.classe === "");
    this.filteredArray = this.items

    this.prendiPersone()
}

modifica(){
  for(let stud of this.selectedStudents){
    let s = this.servizio.studenteToId(stud.name, stud.surname, '')
    stud.classe = this.servizio.classeToId(this.classeFrequentata)
    this.servizio.updateStudente(stud, s)
  }
}

cambiaOpzione(){
  if(this.selectedOption == 'new'){
    this.selectedOption = 'existing';
    this.testo = 'inserisci manualmente'
  }
  else{
    this.selectedOption = 'new';
    this.testo = "scegli dall'elenco"
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

performSearch(): void {
  this.filteredArray = this.items
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
