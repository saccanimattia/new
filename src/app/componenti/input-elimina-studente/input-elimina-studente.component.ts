import { Component, Input } from '@angular/core';
import { PrendiDatiService } from 'src/app/servizi/prendi-dati.service';


@Component({
  selector: 'app-input-elimina-studente',
  templateUrl: './input-elimina-studente.component.html',
  styleUrls: ['./input-elimina-studente.component.scss']
})
export class InputEliminaStudenteComponent {
  studente:any = {
    name: 'nome',
    surname: 'cognome',
    classe: 'classe',
  };

  @Input() classeFrequentata: any
  constructor(private servizio: PrendiDatiService) {}

  openModale() {
    const modal = document.querySelector('.modalElimina');
    modal?.classList.add('show');
    modal?.setAttribute('style', 'display: block');
  }

  closeModale() {
    const modal = document.querySelector('.modalElimina');
    modal?.classList.remove('show');
    modal?.setAttribute('style', 'display: none');
  }

  saveClass() {
    // Qui puoi eseguire l'azione di salvataggio della classe con this.newClassName
    this.elimina();
    this.closeModale();
  }

  elimina() {
    this.studente.classe = this.servizio.classeToId(this.classeFrequentata)
    this.servizio.eliminaStudente(this.servizio.studenteToId(this.studente.name, this.studente.surname, this.studente.classe))
  }
}
