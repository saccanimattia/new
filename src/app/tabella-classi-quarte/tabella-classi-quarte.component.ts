import { Component } from '@angular/core';
import { PrendiDatiService } from '../servizi/prendi-dati.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-tabella-classi-quarte',
  templateUrl: './tabella-classi-quarte.component.html',
  styleUrls: ['./tabella-classi-quarte.component.scss']
})
export class TabellaClassiQuarteComponent {
  studenti: any[] = [];
  classiQuarte: any
  alunni: any;
  isProfile: any;

  constructor(private prendi: PrendiDatiService, private route : ActivatedRoute) {

  }

  ngOnInit(): void{
    this.prendiClassi()
    this.route.snapshot.paramMap.get('id')
  }

  async prendiClassi(): Promise<void> {
    try {
      this.classiQuarte = await this.prendi.prendiClassi();
      console.log(this.classiQuarte.items)
      this.classiQuarte = this.classiQuarte.items
    } catch (err) {
      console.log("Si è verificato un errore:", err);
    }
  }

  async prendiStudenti(): Promise<void> {
    try {
      this.alunni = await this.prendi.prendiStudenti();
      this.alunni = this.alunni.items;
    } catch (err) {
      console.log("Si è verificato un errore:", err);
    }
  }

  visualizza(classe: any){
    if(this.studenti.length!=0)
      this.studenti.slice();
    this.prendiStudenti()

     this.confrontaTutto(classe.field)

  }

  confrontaTutto(classe: any){
    for(let studentee of classe){
      this.confronta(studentee)
    }

 }

  confronta(stud: any){

    for(let s of this.alunni){
      console.log(s.id)
      if(s.id == stud)
        this.studenti.push(s)
    }
  }














}
