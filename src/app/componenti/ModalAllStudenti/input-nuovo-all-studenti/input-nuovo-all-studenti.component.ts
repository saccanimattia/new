import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PrendiDatiService } from '../../../servizi/prendi-dati.service';
import { ArrayServiceService } from '../../../servizi/array-service.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-input-nuovo-all-studenti',
  templateUrl: './input-nuovo-all-studenti.component.html',
  styleUrls: ['./input-nuovo-all-studenti.component.scss'],
})
export class InputNuovoAllStudentiComponent {
  studente:any = {
    name: 'nome',
    surname: 'cognome',
    classe: 'classe',
    birthDate: 'data di nascita'
  };
  o: any;
  @Output() buttonClick = new EventEmitter<void>();
  constructor(private servizio:PrendiDatiService, private arr : ArrayServiceService, private datePipe : DatePipe){}

  ngOnInit(){
  }


  openModal() {
    this.studente = {name: 'nome', surname: 'cognome',classe: 'classe',birthDate: 'data di nascita'}
    const modal = document.querySelector('.modalAllStudenti');
    modal?.classList.add('show');
    modal?.setAttribute('style', 'display: block');
  }

  closeModal() {
    const modal = document.querySelector('.modalAllStudenti');
    modal?.classList.remove('show');
    modal?.setAttribute('style', 'display: none');
    this.buttonClick.emit();
  }


  saveClass() {
    if(this.studente.classe != '')
      this.studente.classe = this.servizio.classeToId(this.studente.classe)
    this.studente.birthDate = this.datePipe.transform(this.studente.birthDate, 'yyyy-MM-dd HH:mm:ss.SSS');
    this.servizio.creaNuovoStudente(this.studente)
    this.studente.birthDate = this.studente.birthDate
    this.o = this.studente
    this.arr.aggiungiAllStudenti(this.o)
    this.closeModal();
  }

}
