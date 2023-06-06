import { Component, Input } from '@angular/core';
import { PrendiDatiService } from 'src/app/servizi/prendi-dati.service';

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
  };

  studenteB:any = {
    name: 'nome',
    surname: 'cognome',
    classe: 'classe',
  };

  @Input() classeFrequentata: any
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
  }

  saveClass() {
    this.aggiorna();
    this.closeModalee();
  }

  aggiorna(){
    this.studenteB.classe = this.servizio.classeToId(this.studenteB.classe)
    this.servizio.updateStudente(this.studenteB, this.servizio.studenteToId(this.studenteA.name, this.studenteA.surname, this.servizio.classeToId(this.classeFrequentata)))
  }
}
