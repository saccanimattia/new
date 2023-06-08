import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { PrendiDatiService } from '../../../servizi/prendi-dati.service';
import { ArrayServiceService } from '../../../servizi/array-service.service';


@Component({
  selector: 'app-input-crea-classe',
  templateUrl: './input-crea-classe.component.html',
  styleUrls: ['./input-crea-classe.component.scss']
})
export class InputCreaClasseComponent{
  classe: any = {
    name: 'nome della classe'
  };
  o : any
  @Output() buttonClick = new EventEmitter<void>();
  constructor(private servizio: PrendiDatiService, private arr: ArrayServiceService) {}



  openModal() {
    this.classe = {name: 'nome della classe'}
    const modal = document.querySelector('.modal');
    modal?.classList.add('show');
    modal?.setAttribute('style', 'display: block');
  }

  closeModal() {
    const modal = document.querySelector('.modal');
    modal?.classList.remove('show');
    modal?.setAttribute('style', 'display: none');
    this.buttonClick.emit();
  }

  saveClass() {
    // Qui puoi eseguire l'azione di salvataggio della classe con this.newClassName
    this.creaClasse();
    this.closeModal();
  }

  creaClasse() {
    this.servizio.creaNuovaClasse(this.classe);
    this. o = this.classe
    this.arr.aggiungiClasse(this.o)
  }
}
