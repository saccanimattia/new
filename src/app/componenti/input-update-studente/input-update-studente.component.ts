import { Component } from '@angular/core';
import { PrendiDatiService } from 'src/app/servizi/prendi-dati.service';

@Component({
  selector: 'app-input-update-studente',
  templateUrl: './input-update-studente.component.html',
  styleUrls: ['./input-update-studente.component.scss']
})
export class InputUpdateStudenteComponent {
  id: any
  studente:any = {
    name: 'nome',
    surname: "cognome",
    birthDate: "2023-06-01 12:10:57.315Z",
    classe: "uvsvmfq4ty8240k"
  };

  constructor(private servizio:PrendiDatiService){}

  inserisci(){
    this.servizio.updateStudente(this.studente, this.id)
  }
}
