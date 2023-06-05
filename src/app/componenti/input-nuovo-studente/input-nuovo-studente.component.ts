import { Component } from '@angular/core';
import { PrendiDatiService } from 'src/app/servizi/prendi-dati.service';


@Component({
  selector: 'app-input-nuovo-studente',
  templateUrl: './input-nuovo-studente.component.html',
  styleUrls: ['./input-nuovo-studente.component.scss']
})
export class InputNuovoStudenteComponent {
  studente:any = {
    name: 'nome',
    surname: "cognome",
    classe: "classe"
  };

  constructor(private servizio:PrendiDatiService){}

  inserisci(){
    this.studente.classe = this.servizio.classeToId(this.studente.classe)
    this.servizio.creaNuovoStudente(this.studente)
  }
}
