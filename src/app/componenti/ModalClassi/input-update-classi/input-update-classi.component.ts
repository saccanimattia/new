import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-input-update-classi',
  templateUrl: './input-update-classi.component.html',
  styleUrls: ['./input-update-classi.component.scss']
})
export class InputUpdateClassiComponent {

  @Output() buttonClick = new EventEmitter<void>();

  constructor() {}



  open() {
    this.buttonClick.emit();
  }

}

