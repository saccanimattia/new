import { Component, Input } from '@angular/core';
import { PrendiDatiService } from 'src/app/servizi/prendi-dati.service';

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

  @Input() classeFrequentata: any
  constructor(private servizio: PrendiDatiService) {}

  openModalee() {
    const modal = document.querySelector('.modalUpdate');
    modal?.classList.add('show');
    modal?.setAttribute('style', 'display: block');
  }

  closeModalee() {
    const modal = document.querySelector('.modalUpdate');
    modal?.classList.remove('show');
    modal?.setAttribute('style', 'display: none');
  }

  saveClass() {
    this.aggiorna();
    this.closeModalee();
  }

  aggiorna(){
    this.classeA.id = this.servizio.classeToId(this.classeA.name)
    this.servizio.updateClasse(this.classeB, this.servizio.classeToId(this.classeA.name))
  }
}
