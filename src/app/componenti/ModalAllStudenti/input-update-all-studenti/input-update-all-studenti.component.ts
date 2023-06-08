import { Component, Input, NgModule } from '@angular/core';
import { PrendiDatiService } from '../../../servizi/prendi-dati.service';




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



  constructor(private servizio: PrendiDatiService) {}

  openModalee() {
    const modal = document.querySelector('.modalUpdate');
    modal?.classList.add('show');
    modal?.setAttribute('style', 'display: block');
  }

  closeModalee() {
    const modal = document.querySelector('.modalUpdate');
    modal?.classList.remove('show');
    modal?.setAttribute('style', 'display: none');
    window.location.reload();
  }

  saveClass() {
    this.aggiorna();
    this.closeModalee();
  }

  aggiorna(){
    this.studenteB.birthDate = new Date(this.studenteB.birthDate)
    if(this.studenteA.classe != '')
      this.studenteA.classe = this.servizio.classeToId(this.studenteA.classe)
    if(this.studenteB.classe != '')
      this.studenteB.classe = this.servizio.classeToId(this.studenteB.classe)
    this.servizio.updateStudente(this.studenteB,  this.servizio.studenteToId(this.studenteA.name, this.studenteA.surname, this.studenteA.classe))
  }
}
