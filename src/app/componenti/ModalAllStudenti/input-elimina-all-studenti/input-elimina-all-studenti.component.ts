import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PrendiDatiService } from '../../../servizi/prendi-dati.service';
import { ArrayServiceService } from '../../../servizi/array-service.service';

@Component({
  selector: 'app-input-elimina-all-studenti',
  templateUrl: './input-elimina-all-studenti.component.html',
  styleUrls: ['./input-elimina-all-studenti.component.scss']
})
export class InputEliminaAllStudentiComponent {

  @Output() buttonClick = new EventEmitter<void>();


  openn(){
    this.buttonClick.emit();
  }
}
