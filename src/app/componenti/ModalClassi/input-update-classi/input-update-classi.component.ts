import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PrendiDatiService } from '../../../servizi/prendi-dati.service';
import { ArrayServiceService } from '../../../servizi/array-service.service';

@Component({
  selector: 'app-input-update-classi',
  templateUrl: './input-update-classi.component.html',
  styleUrls: ['./input-update-classi.component.scss']
})
export class InputUpdateClassiComponent {
  classeA:any = {
    name: 'nome classe',
  };

  classeB:any = {
    name: 'nome classe',
  };
  @Output() buttonClick = new EventEmitter<void>();
  @Input() classeFrequentata: any
  constructor(private servizio: PrendiDatiService, private arr: ArrayServiceService) {}

  openModalee() {
    const modal = document.querySelector('#uS');
    modal?.classList.add('show');
    modal?.setAttribute('style', 'display: block');
  }

  closeModalee() {
    const modal = document.querySelector('#uS');
    modal?.classList.remove('show');
    modal?.setAttribute('style', 'display: none');
    this.buttonClick.emit();
  }

  saveClass() {
    this.aggiorna();
    this.closeModalee();
  }

  aggiorna(){
    console.log(this.classeA.name)
    this.classeA.id = this.servizio.classeToId(this.classeA.name)

    this.servizio.updateClasse(this.classeB, this.servizio.classeToId(this.classeA.name))
    this.arr.updateClassi(this.classeA, this.classeB)
  }
}

