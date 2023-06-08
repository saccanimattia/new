import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PrendiDatiService } from '../../../servizi/prendi-dati.service';
import { ArrayServiceService } from '../../../servizi/array-service.service';

@Component({
  selector: 'app-input-elimina-classe',
  templateUrl: './input-elimina-classe.component.html',
  styleUrls: ['./input-elimina-classe.component.scss']
})
export class InputEliminaClasseComponent {
  @Input() classes: any[] = []
  @Output() buttonClick = new EventEmitter<void>();
  filteredArray: any[] = []
  i: any
  searchQuery: any
  constructor(private servizio: PrendiDatiService, private arr: ArrayServiceService) {}


  openModale() {
    const modal = document.querySelector('.modalElimina');
    modal?.classList.add('show');
    modal?.setAttribute('style', 'display: block');
    this.filteredArray = this.classes
    console.log("this.classes")
    console.log(this.filteredArray)
  }

  closeModale() {
    const modal = document.querySelector('.modalElimina');
    modal?.classList.remove('show');
    modal?.setAttribute('style', 'display: none');
    this.buttonClick.emit();
  }


  elimina(classe: any) {
    this.servizio.eliminaClasse(this.servizio.classeToId(classe.name))
  }

  deleteClasses(): void {
    console.log(this.classes)
    for(let classe of this.classes){
      this.elimina(classe);
    }
    console.log(this.classes)
    this.arr.eliminaClassi(this.classes)
    this.closeModale();
  }

  performSearch(): void {
    this.filteredArray = this.classes
    this.filteredArray = this.classes.filter(item => {
      return item.name.toLowerCase().includes(this.searchQuery.toLowerCase());
    });
  }
}
