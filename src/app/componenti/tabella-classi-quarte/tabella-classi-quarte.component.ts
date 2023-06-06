import { Component, OnInit } from '@angular/core';
import { PrendiDatiService } from '../../servizi/prendi-dati.service';
import { ActivatedRoute, Router } from '@angular/router';
import { PocketBaseService } from 'src/app/servizi/pocket-base-service.service';
import { Subscription } from 'rxjs';


declare var window : any

@Component({
  selector: 'app-tabella-classi-quarte',
  templateUrl: './tabella-classi-quarte.component.html',
  styleUrls: ['./tabella-classi-quarte.component.scss']
})
export class TabellaClassiQuarteComponent implements OnInit{
  classiQuarte: any[] = [];
  classeSelezionata: any
  isClasse: any
  formModal:any
  private studentsSubscription!: Subscription;
  x:any
  searchQuery: string = '';
  filteredArray: any[] = [];

  constructor(private prendi: PrendiDatiService, private router : Router, private pocketBaseService: PocketBaseService) {

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
    console.log(this.filteredArray)
  }

}















