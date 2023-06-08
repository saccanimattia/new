import { Component, Input } from '@angular/core';
import { PrendiDatiService } from '../../../servizi/prendi-dati.service';

@Component({
  selector: 'app-input-nuovo-all-studenti',
  templateUrl: './input-nuovo-all-studenti.component.html',
  styleUrls: ['./input-nuovo-all-studenti.component.scss']
})
export class InputNuovoAllStudentiComponent {
  studente:any = {
    name: 'nome',
    surname: 'cognome',
    classe: 'classe',
    birthDate: 'data di nascita'
  };

  constructor(private servizio:PrendiDatiService){}

  ngOnInit(){
  }


  openModal() {
    const modal = document.querySelector('.modalAllStudenti');
    modal?.classList.add('show');
    modal?.setAttribute('style', 'display: block');
  }

  closeModal() {
    const modal = document.querySelector('.modalAllStudenti');
    modal?.classList.remove('show');
    modal?.setAttribute('style', 'display: none');
    window.location.reload();
  }


  saveClass() {
    if(this.studente.classe != '')
      this.studente.classe = this.servizio.classeToId(this.studente.classe)
    this.studente.birthDate = new Date(this.studente.birthDate)
    this.servizio.creaNuovoStudente(this.studente)
    this.closeModal();
  }

}
