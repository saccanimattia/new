import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PrendiDatiService } from '../../../servizi/prendi-dati.service';
import { ArrayServiceService } from '../../../servizi/array-service.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-input-nuovo-all-studenti',
  templateUrl: './input-nuovo-all-studenti.component.html',
  styleUrls: ['./input-nuovo-all-studenti.component.scss'],
})
export class InputNuovoAllStudentiComponent {
  studente:any = {
    name: 'nome',
    surname: 'cognome',
    classe: 'classe',
    birthDate: 'data di nascita'
  };
  o: any;
  classi : any[] = []
  @Output() buttonClick = new EventEmitter<void>();
  constructor(private servizio:PrendiDatiService, private arr : ArrayServiceService, private datePipe : DatePipe){}

  ngOnInit(){
  }


  openModal() {
    this.studente = {name: 'nome', surname: 'cognome',classe: 'classe',birthDate: 'data di nascita'}
    const modal = document.querySelector('.modalAllStudenti');
    modal?.classList.add('show');
    modal?.setAttribute('style', 'display: block');
    this.prendiClassi()
  }

  closeModal() {
    const modal = document.querySelector('.modalAllStudenti');
    modal?.classList.remove('show');
    modal?.setAttribute('style', 'display: none');
    this.buttonClick.emit();
  }

  async prendiClassi(): Promise<void> {
    try {

      let quarte: any = await this.servizio.prendiClassi();
      this.classi = quarte.items as any[]
    } catch (err) {
      console.log("Si è verificato un errore:", err);
    }
  }


  saveClass() {
    this.studente.birthDate = this.datePipe.transform(this.studente.birthDate, 'yyyy-MM-dd HH:mm:ss.SSS')
    this.o = this.studente
    console.log(this.o)
    console.log(this.classi)
    this.arr.aggiungiAllStudenti(this.o)
    if(this.studente.classe != '')
      this.studente.classe = this.servizio.classeToId(this.studente.classe)
      this.servizio.creaNuovoStudente(this.studente)
    this.closeModal();
  }

}
