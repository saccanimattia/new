import { Component, OnInit } from '@angular/core';
import { PrendiDatiService } from 'src/app/servizi/prendi-dati.service';


@Component({
  selector: 'app-input-crea-classe',
  templateUrl: './input-crea-classe.component.html',
  styleUrls: ['./input-crea-classe.component.scss']
})
export class InputCreaClasseComponent{
  classe: any = {
    name: 'nome della classe'
  };

  constructor(private servizio: PrendiDatiService) {}



  openModal() {
    const modal = document.querySelector('.modal');
    modal?.classList.add('show');
    modal?.setAttribute('style', 'display: block');
  }

  closeModal() {
    const modal = document.querySelector('.modal');
    modal?.classList.remove('show');
    modal?.setAttribute('style', 'display: none');
  }

  saveClass() {
    // Qui puoi eseguire l'azione di salvataggio della classe con this.newClassName
    this.creaClasse();
    this.closeModal();
  }

  creaClasse() {
    this.servizio.creaNuovaClasse(this.classe);
  }
}
