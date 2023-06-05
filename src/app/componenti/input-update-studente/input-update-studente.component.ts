import { Component } from '@angular/core';
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
  };
  studenteB:any = {
    name: 'nome',
    surname: "cognome",
    classe: "classe"
  };

  constructor(private servizio:PrendiDatiService){}

  inserisci(){
    this.studenteB.classe = this.servizio.classeToId(this.studenteB.classe)
    this.servizio.updateStudente(this.studenteB, this.servizio.studenteToId(this.studenteA.name, this.studenteA.surname))
  }
}
