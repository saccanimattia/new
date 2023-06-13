import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PrendiDatiService } from '../../../servizi/prendi-dati.service';
import { ArrayServiceService } from '../../../servizi/array-service.service';

@Component({
  selector: 'app-input-elimina-classe',
  templateUrl: './input-elimina-classe.component.html',
  styleUrls: ['./input-elimina-classe.component.scss']
})
export class InputEliminaClasseComponent {

  @Output() buttonClick = new EventEmitter<void>();
  c(){
    this.buttonClick.emit();
  }
}
