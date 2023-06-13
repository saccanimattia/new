import { Component, EventEmitter, Input, NgModule, Output } from '@angular/core';
import { PrendiDatiService } from '../../../servizi/prendi-dati.service';
import { ArrayServiceService } from '../../../servizi/array-service.service';
import { DatePipe } from '@angular/common';




@Component({
  selector: 'app-input-update-all-studenti',
  templateUrl: './input-update-all-studenti.component.html',
  styleUrls: ['./input-update-all-studenti.component.scss']
})

export class InputUpdateAllStudentiComponent {


  @Output() buttonClick = new EventEmitter<void>();


  open(){
    this.buttonClick.emit();
  }
}
