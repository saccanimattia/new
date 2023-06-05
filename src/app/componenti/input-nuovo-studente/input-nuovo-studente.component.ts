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
    birthDate: "2023-06-01 12:10:57.315Z",
    classe: "uvsvmfq4ty8240k"
  };

  constructor(private servizio:PrendiDatiService){}

  inserisci(){
    this.servizio.creaNuovoStudente(this.studente)
  }
}
