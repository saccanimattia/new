import { Component, EventEmitter, Input, NgModule, Output } from '@angular/core';
import { PrendiDatiService } from '../../../servizi/prendi-dati.service';
import { ArrayServiceService } from '../../../servizi/array-service.service';
import { DatePipe } from '@angular/common';




@Component({
  selector: 'app-input-update-all-studenti',
  templateUrl: './input-update-all-studenti.component.html',
  styleUrls: ['./input-update-all-studenti.component.scss']
})

export class InputUpdateAllStudentiComponent {
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



  constructor(private servizio: PrendiDatiService, private arr : ArrayServiceService, private datePipe : DatePipe) {}

  openModalee() {
    const modal = document.querySelector('.modalUpdate');
    modal?.classList.add('show');
    modal?.setAttribute('style', 'display: block');
  }

  closeModalee() {
    const modal = document.querySelector('.modalUpdate');
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
    this.arr.updateStudenteClasse(this.studenteA, this.studenteB)
    if(this.studenteA.classe != '')
      this.studenteA.classe = this.servizio.classeToId(this.studenteA.classe)
    if(this.studenteB.classe != '')
      this.studenteB.classe = this.servizio.classeToId(this.studenteB.classe)
    this.servizio.updateStudente(this.studenteB,  this.servizio.studenteToId(this.studenteA.name, this.studenteA.surname, this.studenteA.classe))
  }
}
