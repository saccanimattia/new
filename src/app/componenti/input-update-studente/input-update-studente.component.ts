import { Component } from '@angular/core';
import { PrendiDatiService } from 'src/app/servizi/prendi-dati.service';

@Component({
  selector: 'app-input-update-studente',
  templateUrl: './input-update-studente.component.html',
  styleUrls: ['./input-update-studente.component.scss']
})
export class InputUpdateStudenteComponent {
  id= "id studente da modificare"
  studente:any = {
    name: 'nome',
    surname: "cognome",
    birthDate: "data nascita",
    classe: "id della classe"
  };

  constructor(private servizio:PrendiDatiService){}

  inserisci(){
    this.servizio.updateStudente(this.studente, this.id)
  }
}
