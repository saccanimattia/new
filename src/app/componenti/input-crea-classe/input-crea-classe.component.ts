import { Component } from '@angular/core';
import { PrendiDatiService } from 'src/app/servizi/prendi-dati.service';

@Component({
  selector: 'app-input-crea-classe',
  templateUrl: './input-crea-classe.component.html',
  styleUrls: ['./input-crea-classe.component.scss']
})
export class InputCreaClasseComponent {
  classe:any = {
    name: 'nomeClasse'
  };

  constructor(private servizio:PrendiDatiService){}

  creaClasse(){
    this.servizio.creaNuovaClasse(this.classe)
  }
}
