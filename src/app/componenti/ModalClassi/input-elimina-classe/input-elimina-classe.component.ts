import { Component, Input } from '@angular/core';
import { PrendiDatiService } from 'src/app/servizi/prendi-dati.service';

@Component({
  selector: 'app-input-elimina-classe',
  templateUrl: './input-elimina-classe.component.html',
  styleUrls: ['./input-elimina-classe.component.scss']
})
export class InputEliminaClasseComponent {
  @Input() classes: any[] = []
  filteredArray: any[] = []
  i: any
  searchQuery: any
  constructor(private servizio: PrendiDatiService) {}


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
  }


  elimina(classe: any) {
    this.servizio.eliminaClasse(this.servizio.classeToId(classe.name))
  }

  deleteClasses(): void {
    for(let classe of this.classes){
      this.elimina(classe);
    }
    this.closeModale();
  }

  performSearch(): void {
    this.filteredArray = this.classes
    this.filteredArray = this.classes.filter(item => {
      return item.name.toLowerCase().includes(this.searchQuery.toLowerCase());
    });
  }
}
