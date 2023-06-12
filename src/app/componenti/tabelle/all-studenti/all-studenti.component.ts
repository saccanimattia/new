import { Component, Input, ViewChild } from '@angular/core';
import { PrendiDatiService } from '../../../servizi/prendi-dati.service';
import { ArrayServiceService } from '../../../servizi/array-service.service';
import { MatPaginator, PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-all-studenti',
  templateUrl: './all-studenti.component.html',
  styleUrls: ['./all-studenti.component.scss']
})
export class AllStudentiComponent {
  studentiVisualizzati: any[] = []
  @ViewChild(MatPaginator) paginator!: MatPaginator;
    studentiClasse: any[] = [];
    classi: any[] = [];
    persone: any[] = [];
    cl: any[] = [];
    selectedStudents: any[] = [];
    c:any;
    classeId: any
    classe: any
    i = 0;
    ord1 = "bi bi-caret-down"
    ord2 = "bi bi-caret-down"
    ord3 = "bi bi-caret-down"
    ord4 = "bi bi-caret-down"

    constructor(private prendi: PrendiDatiService, private arr:ArrayServiceService) {

    }

    ngOnInit() {
      this.prendiClassi()
      this.prendiStudenti()
    }

    ngOnChange() {
      this.prendiClassi()
      this.prendiStudenti()
    }

    trasformaClassi(){
      for(let studente of this.filteredArray){
        if(studente.classe != '')
        studente.classe = this.prendi.idToClass(studente.classe, this.cl)
      }
    }

    async prendiStudenti(): Promise<void> {
        let a:any = await this.prendi.prendiStudenti()
        this.studentiClasse = a;
        this.filteredArray = this.studentiClasse
        this.studentiVisualizzati = this.filteredArray.slice(0, 5);
        this.trasformaClassi()
        this.prendiPersone();
        this.arr.inizializzaAllStudenti(this.studentiClasse)
    }

    async prendiClassi(): Promise<void> {
      try {

        let quarte: any = await this.prendi.prendiClassi();
        this.cl = quarte.items as any[]

      } catch (err) {
        console.log("Si è verificato un errore:", err);
      }
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
      this.studentiVisualizzati = this.filteredArray.slice(0,this.paginator.pageSize)
    }


    prendiPersone(){
      for(let persona of this.filteredArray){
        this.persone.push(persona.name + " " + persona.surname + " " + persona.birthDate + " " + persona.classe)
      }
    }

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

      this.studentiClasse = this.arr.prendiAllStudenti()

      this.trasformaNuoveClassi()
      this.filteredArray = this.studentiClasse
      this.studentiVisualizzati = this.filteredArray.slice(0,this.paginator.pageSize)
      this.selectedStudents = [];
     }


     trasformaNuoveClassi(){
      console.log(this.cl)
      for(let s of this.studentiClasse){
        console.log(isNaN(parseInt(s.classe.charAt(0), 10)))
        if(parseInt(s.classe.charAt(0), 10) ){
          s.classe = this.prendi.idToClass(s.classe, this.cl)
        }

      }
     }

     onPageChange(event: PageEvent) {
      this.paginator.pageIndex = event.pageIndex;
      this.paginator.pageSize = event.pageSize;
      const startIndex = event.pageIndex * event.pageSize;
      const endIndex = startIndex + event.pageSize;
      this.studentiVisualizzati = this.filteredArray.slice(startIndex, endIndex);
      // Puoi aggiornare i dati visualizzati in base alla pagina corrente qui
    }

    ordinaN(){
      this.svoutaTriangoli()
      this.ord1 = "bi bi-caret-down-fill"
      this.studentiClasse.sort((a:any, b:any) => a.name.localeCompare(b.name));
      this.filteredArray = this.studentiClasse
      this.studentiVisualizzati = this.filteredArray.slice(0,this.paginator.pageSize)
    }

    ordinaC(){
      this.svoutaTriangoli()
      this.ord2 = "bi bi-caret-down-fill"
      this.studentiClasse.sort((a:any, b:any) => a.surname.localeCompare(b.surname));
      this.filteredArray = this.studentiClasse
      this.studentiVisualizzati = this.filteredArray.slice(0,this.paginator.pageSize)
    }

    ordinaDN(){
      this.svoutaTriangoli()
      this.ord3 = "bi bi-caret-down-fill"
      this.studentiClasse.sort((a:any, b:any) => a.birthDate.localeCompare(b.birthDate));
      this.filteredArray = this.studentiClasse
      this.studentiVisualizzati = this.filteredArray.slice(0,this.paginator.pageSize)
    }

    ordinaCL(){
      this.svoutaTriangoli()
      this.ord4 = "bi bi-caret-down-fill"
      this.studentiClasse.sort((a:any, b:any) => a.classe.localeCompare(b.classe));
      this.filteredArray = this.studentiClasse
      this.studentiVisualizzati = this.filteredArray.slice(0,this.paginator.pageSize)
    }


    svoutaTriangoli() {
      this.ord1 = "bi bi-caret-down"
      this.ord2 = "bi bi-caret-down"
      this.ord3 = "bi bi-caret-down"
      this.ord4 = "bi bi-caret-down"
    }
}




