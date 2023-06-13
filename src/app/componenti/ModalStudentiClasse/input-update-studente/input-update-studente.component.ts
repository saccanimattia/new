import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PrendiDatiService } from '../../../servizi/prendi-dati.service';
import { DatePipe } from '@angular/common';
import { ArrayServiceService } from '../../../servizi/array-service.service';

@Component({
  selector: 'app-input-update-studente',
  templateUrl: './input-update-studente.component.html',
  styleUrls: ['./input-update-studente.component.scss']
})
export class InputUpdateStudenteComponent {

  @Output() buttonClick = new EventEmitter<void>();

  o(){
    this.buttonClick.emit()
  }
}
