import { Component } from '@angular/core';
import { PrendiDatiService } from '../../servizi/prendi-dati.service';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-tabella-classi-quarte',
  templateUrl: './tabella-classi-quarte.component.html',
  styleUrls: ['./tabella-classi-quarte.component.scss']
})
export class TabellaClassiQuarteComponent {
  classiQuarte: any[] = [];
  classeSelezionata: any
  isClasse: any

  constructor(private prendi: PrendiDatiService, private router : Router) {

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

  visualizza(classe: any, index: number) {
    const classeId = index + 1;
    this.router.navigate(['/classe', classeId]);
  }

  ordinaClassi(){
    this.classiQuarte = this.prendi.ordinaClassi();
    }


}















