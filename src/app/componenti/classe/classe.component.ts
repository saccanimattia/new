import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { PrendiDatiService } from '../../servizi/prendi-dati.service';

@Component({
  selector: 'app-classe',
  templateUrl: './classe.component.html',
  styleUrls: ['./classe.component.scss']
})
export class ClasseComponent implements OnChanges{
  @Input() classeS: any
  studentiClasse: any[] = [];
  constructor(private prendi: PrendiDatiService) {

  }
  ngOnChanges(): void {
    this.prendiStudenti()
  }

  async prendiStudenti(): Promise<void> {
    try {
      let a:any = await this.prendi.prendiStudenti()
      this.studentiClasse = a.items.filter((studente: any) => studente.classe === this.classeS);
      console.log(this.studentiClasse)
    } catch (err) {
      console.log("Si è verificato un errore:", err);
    }
  }



}
