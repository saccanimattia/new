import { Component } from '@angular/core';
import { PrendiDatiService } from '../../servizi/prendi-dati.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-tabella-classi-quarte',
  templateUrl: './tabella-classi-quarte.component.html',
  styleUrls: ['./tabella-classi-quarte.component.scss']
})
export class TabellaClassiQuarteComponent {
  classiQuarte: any[] = [];
  classeSelezionata: any

  constructor(private prendi: PrendiDatiService, private route : ActivatedRoute) {

  }

  ngOnInit(): void{
    this.prendiClassi()
  }

  async prendiClassi(): Promise<void> {
    try {

      let quarte: any = await this.prendi.prendiClassi();
      this.classiQuarte = quarte.items as any[]
    } catch (err) {
      console.log("Si è verificato un errore:", err);
    }
  }

  visualizza(classe: any, ind: any){

    this.classeSelezionata = classe.id;
  }
}















