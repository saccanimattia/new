import { Component, Input, ViewChild } from '@angular/core';
import { PrendiDatiService } from '../../../servizi/prendi-dati.service';
import { ArrayServiceService } from '../../../servizi/array-service.service';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { DatePipe } from '@angular/common';

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
    isSelected = false;
    constructor(private prendi: PrendiDatiService, private arr:ArrayServiceService, private datePipe : DatePipe) {

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
      console.log("this.studentiClasse")
      console.log(this.studentiClasse)
      this.trasformaNuoveClassi()
      this.filteredArray = this.studentiClasse
      this.studentiVisualizzati = this.filteredArray.slice(0,this.paginator.pageSize)
      this.selectedStudents = [];
     }


     trasformaNuoveClassi(){
      for(let s of this.studentiClasse){
        console.log()
        if(isNaN(parseInt(s.classe.charAt(0), 10)) || s.classe != ''){
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
      this.filteredArray.sort((a:any, b:any) => a.name.localeCompare(b.name));
      this.studentiVisualizzati = this.filteredArray.slice(0,this.paginator.pageSize)
    }

    ordinaC(){
      this.svoutaTriangoli()
      this.ord2 = "bi bi-caret-down-fill"
      this.filteredArray.sort((a:any, b:any) => a.surname.localeCompare(b.surname));

      this.studentiVisualizzati = this.filteredArray.slice(0,this.paginator.pageSize)
    }

    ordinaDN(){
      this.svoutaTriangoli()
      this.ord3 = "bi bi-caret-down-fill"
      this.filteredArray.sort((a:any, b:any) => a.birthDate.localeCompare(b.birthDate));
      this.studentiVisualizzati = this.filteredArray.slice(0,this.paginator.pageSize)
    }

    ordinaCL(){
      this.svoutaTriangoli()
      this.ord4 = "bi bi-caret-down-fill"
      this.filteredArray.sort((a:any, b:any) => a.classe.localeCompare(b.classe));
      this.studentiVisualizzati = this.filteredArray.slice(0,this.paginator.pageSize)
    }


    svoutaTriangoli() {
      this.ord1 = "bi bi-caret-down"
      this.ord2 = "bi bi-caret-down"
      this.ord3 = "bi bi-caret-down"
      this.ord4 = "bi bi-caret-down"
    }

    selezionaTutti() {
      this.selectedStudents = [...this.studentiVisualizzati];
      this.studentiVisualizzati.forEach(st => {
        st.selected = true;
      });
    }

    deselezionaTutti() {
      this.selectedStudents = [];
      this.studentiVisualizzati.forEach(st => {
        st.selected = false;
      });
      this.isSelected = false
    }

    gestisciSelezioneTutti() {
      if (this.selectedStudents.length === this.studentiVisualizzati.length || this.isSelected === true) {
        this.deselezionaTutti();
      } else {
        this.selezionaTutti();
      }
    }

    clickModifica(alunno: any) {
      console.log(alunno)
      this.studenteA = alunno;
      this.openModalee()
    }

    clickModificaa(classe: any) {
      if(classe != null){
        this.selectedStudents = [];
        this.selectedStudents.push(classe)

      }
      this.openModale()
    }

    studenteA: any

    studenteB:any = {
      name: 'nome',
      surname: 'cognome',
      classe: 'classe',
      birthDate: 'data di nascita'
    };


    openModalee() {
      this.studenteB= {
        name: 'nome',
        surname: 'cognome',
        classe: 'classe',
        birthDate: 'data di nascita'
      };
      const modal = document.querySelector('#mU');
      modal?.classList.add('show');
      modal?.setAttribute('style', 'display: block');
    }

    closeModalee() {
      const modal = document.querySelector('#mU');
      modal?.classList.remove('show');
      modal?.setAttribute('style', 'display: none');
      this.modalChiuso()
    }

    saveClass() {
      this.aggiorna();
      this.closeModalee();
    }

    aggiorna(){
      this.studenteB.birthDate = this.datePipe.transform(this.studenteB.birthDate, 'yyyy-MM-dd HH:mm:ss.SSS');
      if(this.studenteB.classe != '')
      this.studenteB.classe = this.prendi.classeToId(this.studenteB.classe)
      this.prendi.updateStudente(this.studenteB, this.prendi.studenteToId(this.studenteA.name, this.studenteA.surname, this.studenteA.classe))
      this.arr.updateAllStudenti(this.studenteA, this.studenteB)

    }

  filteredArrayy: any[] = []
  personee: any[] = []
  ii: any
  searchQueryy: any

  openModale() {

    const modal = document.querySelector('#mE');
    modal?.classList.add('show');
    modal?.setAttribute('style', 'display: block');
    this.filteredArrayy = this.selectedStudents
    this.prendiPersonee()
  }

  closeModale() {
    const modal = document.querySelector('#mE');
    modal?.classList.remove('show');
    modal?.setAttribute('style', 'display: none');
    this.modalChiuso()
  }


  elimina(studente: any) {
    if(studente.classe != '')
      studente.classe = this.prendi.classeToId(studente.classe)
    studente.birthDate = new Date(studente.birthDate)
    this.prendi.eliminaStudente(this.prendi.studenteToId(studente.name, studente.surname, studente.classe))
  }

  deleteStudents(): void {
    for(let studente of this.selectedStudents){
      this.elimina(studente);
    }
    this.arr.eliminaAllStudenti(this.selectedStudents)
    this.closeModale();
    console.log(this.selectedStudents)

  }

  performSearchh(): void {
    console.log(this.filteredArrayy)
    this.filteredArrayy = this.selectedStudents
    this.ii = 0
    this.filteredArrayy = this.filteredArrayy.filter(item => {
      this.ii = this.ii+1
      return this.personee[this.ii - 1].toLowerCase().includes(this.searchQueryy.toLowerCase());
    });
    console.log(this.filteredArrayy)
  }

  prendiPersonee(){
    console.log("ifb")
    for(let persona of this.filteredArrayy){
      console.log("persona")
      console.log(persona)
      this.personee.push(persona.name + " " + persona.surname + " " + persona.birthDate)
    }
  }




}




