import { Component, OnInit, ViewChild } from '@angular/core';
import { PrendiDatiService } from '../../../servizi/prendi-dati.service';
import { ActivatedRoute, Router } from '@angular/router';
import { PocketBaseService } from '../../../servizi/pocket-base-service.service'
import { Subscription } from 'rxjs';
import { ArrayServiceService } from '../../../servizi/array-service.service';
import { MatPaginator, PageEvent } from '@angular/material/paginator';


declare var window : any

@Component({
  selector: 'app-tabella-classi-quarte',
  templateUrl: './tabella-classi-quarte.component.html',
  styleUrls: ['./tabella-classi-quarte.component.scss']
})
export class TabellaClassiQuarteComponent implements OnInit{
  classiQuarte: any[] = [];
  classeSelezionata: any
  selectedClasses: any[] = []
  isClasse: any
  formModal:any
  private studentsSubscription!: Subscription;
  x:any
  searchQuery: string = '';
  filteredArray: any[] = [];
  classi: any[] = [];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(private prendi: PrendiDatiService, private router : Router, private pocketBaseService: PocketBaseService, private arr:ArrayServiceService) {

  }

  ngOnInit(): void {
    this.prendiClassi();

    this.studentsSubscription = this.pocketBaseService.subscribeToStudentsChanges()
      .subscribe({
        next: (student) => {
          console.log("Dentro la sottoscrizione", student);
          this.x = student;
        },
        error: (error) => {
          console.log("Errore durante la sottoscrizione", error);
        },
        complete: () => {
          console.log("Sottoscrizione completata");
          console.log("this.x:", this.x);
        }
      });

  }

  async prendiClassi(): Promise<void> {
    try {

      let quarte: any = await this.prendi.prendiClassi();
      this.classiQuarte = quarte.items as any[]
      this.filteredArray = this.classiQuarte
      this.classi = this.filteredArray.slice(0, 5);
      this.arr.inizializzaClassi(this.classiQuarte)
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


    ngOnDestroy(): void {
      this.studentsSubscription.unsubscribe();
    }





    performSearch(): void {
    this.filteredArray = this.classiQuarte
    this.filteredArray = this.classiQuarte.filter(item => {
      return item.name.toLowerCase().includes(this.searchQuery.toLowerCase());
    });
  }

  toggleSelected(classe: any) {
    if (classe.selected) {
      this.selectedClasses.push(classe);
    } else {
      const index = this.selectedClasses.findIndex((selectedClasse) => selectedClasse.name === classe.name);
      if (index !== -1) {
        this.selectedClasses.splice(index, 1);
      }
    }

  }
   modalChiuso(){
    this.classiQuarte = this.arr.prendiClassi()
    this.filteredArray = this.classiQuarte
    this.selectedClasses = []
   }

   onPageChange(event: PageEvent) {
    this.paginator.pageIndex = event.pageIndex;
    this.paginator.pageSize = event.pageSize;
    const startIndex = event.pageIndex * event.pageSize;
    const endIndex = startIndex + event.pageSize;
    this.classi = this.filteredArray.slice(startIndex, endIndex);
    // Puoi aggiornare i dati visualizzati in base alla pagina corrente qui
  }
}















