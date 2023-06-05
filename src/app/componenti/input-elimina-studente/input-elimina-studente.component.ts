import { Component } from '@angular/core';
import { PrendiDatiService } from 'src/app/servizi/prendi-dati.service';


@Component({
  selector: 'app-input-elimina-studente',
  templateUrl: './input-elimina-studente.component.html',
  styleUrls: ['./input-elimina-studente.component.scss']
})
export class InputEliminaStudenteComponent {
  id = "id"


  constructor(private servizio:PrendiDatiService){}

  elimina(){
    this.servizio.eliminaStudente(this.id)
  }
}
