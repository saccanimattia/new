import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PrendiDatiService } from '../../../servizi/prendi-dati.service';
import { ArrayServiceService } from '../../../servizi/array-service.service';


@Component({
  selector: 'app-input-elimina-studente',
  templateUrl: './input-elimina-studente.component.html',
  styleUrls: ['./input-elimina-studente.component.scss']
})
export class InputEliminaStudenteComponent {


  @Output() buttonClick = new EventEmitter<void>();

  ope() {

    this.buttonClick.emit();

  }


}
