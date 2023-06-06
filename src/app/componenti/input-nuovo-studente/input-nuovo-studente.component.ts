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

  constructor(private servizio:PrendiDatiService){}

  ngOnInit(){
    if(this.classeFrequentata == null)
      this.studente.classe = ''
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
      if(this.studente.classe != ''){
        this.studente.classe = this.servizio.classeToId(this.classeFrequentata)
      }
      this.studente.birthDate = new Date(this.studente.birthDate)
      this.servizio.creaNuovoStudente(this.studente)
    } else if (this.selectedOption === 'existing') {
      for (let item of this.items) {
        if (item.selected) {
          this.selectedStudents.push(item);
        }
      }
      this.modifica()
    }


    this.items.forEach(item => item.selected = false);
    this.selectedOption = 'new';
    this.closeModal();
  }

  async prendiStudenti(): Promise<void> {
    let a:any = await this.servizio.prendiStudenti()
    this.items = a.filter((studente: any) => studente.classe === "");
}

modifica(){
  for(let stud of this.selectedStudents){
    stud.birthDate = new Date(stud.birthDate)
    let s = this.servizio.studenteToId(stud.name, stud.surname, '')
    if(this.studente.classe != ''){
      this.studente.classe = this.servizio.classeToId(this.classeFrequentata)
    }

    this.servizio.updateStudente(stud, s)
  }
}


}
