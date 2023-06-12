
import { Component, Input, OnChanges, OnInit, ViewChild } from '@angular/core';
import { PrendiDatiService } from '../../../servizi/prendi-dati.service';
import { ActivatedRoute } from '@angular/router';
import { ArrayServiceService } from '../../../servizi/array-service.service';
import { MatPaginator, PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-classe',
  templateUrl: './classe.component.html',
  styleUrls: ['./classe.component.scss']
})
export class ClasseComponent{
  classeS: any
  studentiClasse: any[] = [];
  classi: any[] = [];

  classeId: any
  classe: any
  persone: any[] = []
  i : any
  s: any[] =[]
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(private prendi: PrendiDatiService, private route: ActivatedRoute, private arr:ArrayServiceService) {
    this.route.params.subscribe(params => {
       this.classeId = params['id'];
    });
  }

  ngOnInit() {
    this.prendiClassi()
    this.prendiStudenti()
  }

  async prendiClassi(): Promise<void> {
    try {

      let quarte: any = await this.prendi.prendiClassi();
      this.classi = quarte.items as any[]
      this.classe = this.classi[this.classeId-1]
      this.classeS = this.classe.id
    } catch (err) {
      console.log("Si è verificato un errore:", err);
    }
  }




  async prendiStudenti(): Promise<void> {
      let a:any = await this.prendi.prendiStudenti()
      this.studentiClasse = a.filter((studente: any) => studente.classe === this.classeS);
      this.filteredArray = this.studentiClasse
      this.s = this.filteredArray.slice(0, 5);
      this.prendiPersone()
      this.arr.inizializzaStudentiClasse(this.studentiClasse)
  }

  searchQuery: string = '';
  filteredArray: any[] = [];

  performSearch(): void {
    this.filteredArray = this.studentiClasse
    this.i = 0
    this.filteredArray = this.filteredArray.filter(item => {
      this.i = this.i+1
      return this.persone[this.i - 1].toLowerCase().includes(this.searchQuery.toLowerCase());
    });
  }

  prendiPersone(){
    for(let persona of this.filteredArray){

      this.persone.push(persona.name + " " + persona.surname + " " + persona.birthDate)
    }
  }

  selectedStudents: any[] = [];

toggleStudentSelection(student: any): void {
  if (student.selected) {
    this.selectedStudents.push(student);
  } else {
    const index = this.selectedStudents.indexOf(student);
    if (index > -1) {
      this.selectedStudents.splice(index, 1);
    }
  }
}

modalChiuso(){
  this.studentiClasse = this.arr.prendiStudentiClasse()

  this.filteredArray = this.studentiClasse
  this.prendiPersone()
  this.selectedStudents = [];
 }

 onPageChange(event: PageEvent) {
  this.paginator.pageIndex = event.pageIndex;
  this.paginator.pageSize = event.pageSize;
  const startIndex = event.pageIndex * event.pageSize;
  const endIndex = startIndex + event.pageSize;
  this.s = this.filteredArray.slice(startIndex, endIndex);
  // Puoi aggiornare i dati visualizzati in base alla pagina corrente qui
}

}
