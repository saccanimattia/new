import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PrendiDatiService } from '../../../servizi/prendi-dati.service';
import { DatePipe } from '@angular/common';
import { ArrayServiceService } from '../../../servizi/array-service.service';

@Component({
  selector: 'app-input-update-studente',
  templateUrl: './input-update-studente.component.html',
  styleUrls: ['./input-update-studente.component.scss']
})
export class InputUpdateStudenteComponent {
  studenteA:any = {
    name: 'nome',
    surname: 'cognome',
    classe: 'classe',
    birthDate: 'data di nascita'
  };

  studenteB:any = {
    name: 'nome',
    surname: 'cognome',
    classe: 'classe',
    birthDate: 'data di nascita'
  };
  @Output() buttonClick = new EventEmitter<void>();
  @Input() classeFrequentata: any
  constructor(private servizio: PrendiDatiService, private arr : ArrayServiceService, private datePipe : DatePipe) {}

  openModalee() {
    this.studenteA = {name: 'nome', surname: 'cognome',classe: 'classe',birthDate: 'data di nascita'}
    this.studenteB = {name: 'nome', surname: 'cognome',classe: 'classe',birthDate: 'data di nascita'}
    const modal = document.querySelector('#mAC');
    modal?.classList.add('show');
    modal?.setAttribute('style', 'display: block');
  }

  closeModalee() {
    const modal = document.querySelector('#mAC');
    modal?.classList.remove('show');
    modal?.setAttribute('style', 'display: none');
    this.buttonClick.emit();
  }

  saveClass() {
    this.aggiorna();
    this.closeModalee();
  }

  aggiorna(){
    this.studenteB.birthDate = this.datePipe.transform(this.studenteB.birthDate, 'yyyy-MM-dd HH:mm:ss.SSS');
    if(this.studenteB.classe != '')
    this.studenteB.classe = this.servizio.classeToId(this.studenteB.classe)
    this.studenteA.classe = this.servizio.classeToId(this.classeFrequentata)
    this.servizio.updateStudente(this.studenteB, this.servizio.studenteToId(this.studenteA.name, this.studenteA.surname, this.studenteA.classe))
    this.arr.updateStudenteClasse(this.studenteA, this.studenteB)



  }
}
