
import { Component, Input, OnChanges, OnInit, ViewChild } from '@angular/core';
import { PrendiDatiService } from '../../../servizi/prendi-dati.service';
import { ActivatedRoute } from '@angular/router';
import { ArrayServiceService } from '../../../servizi/array-service.service';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { DatePipe } from '@angular/common';

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
  ord1 = "bi bi-caret-down"
  ord2 = "bi bi-caret-down"
  ord3 = "bi bi-caret-down"
  isSelected = false;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(private prendi: PrendiDatiService, private route: ActivatedRoute, private arr:ArrayServiceService, private datePipe : DatePipe) {
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
    this.s = this.filteredArray.slice(0,this.paginator.pageSize)
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
  this.s = this.filteredArray.slice(0,this.paginator.pageSize)
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

ordinaN(){
  this.svoutaTriangoli()
  this.ord1 = "bi bi-caret-down-fill"
  this.filteredArray.sort((a:any, b:any) => a.name.localeCompare(b.name));
  this.s = this.filteredArray.slice(0,this.paginator.pageSize)
}

ordinaC(){
  this.svoutaTriangoli()
  this.ord2 = "bi bi-caret-down-fill"
  this.filteredArray.sort((a:any, b:any) => a.surname.localeCompare(b.surname));
  this.s = this.filteredArray.slice(0,this.paginator.pageSize)
}

ordinaDN(){
  this.svoutaTriangoli()
  this.ord3 = "bi bi-caret-down-fill"
  this.filteredArray.sort((a:any, b:any) => a.birthDate.localeCompare(b.birthDate));
  this.s = this.filteredArray.slice(0,this.paginator.pageSize)
}


svoutaTriangoli() {
  this.ord1 = "bi bi-caret-down"
  this.ord2 = "bi bi-caret-down"
  this.ord3 = "bi bi-caret-down"
}

selezionaTutti() {
  this.selectedStudents = [...this.s];
  this.s.forEach(st => {
    st.selected = true;
  });
}

deselezionaTutti() {
  this.selectedStudents = [];
  this.s.forEach(st => {
    st.selected = false;
  });
  this.isSelected = false
}

gestisciSelezioneTutti() {
  if (this.selectedStudents.length === this.s.length  || this.isSelected === true) {
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
  console.log(classe)
  if(classe != null){
    this.selectedStudents = [];
    this.selectedStudents.push(classe)

  }
  this.openModale()
}


studenteA : any
studenteB:any = {
  name: 'nome',
  surname: 'cognome',
  classe: 'classe',
  birthDate: 'data di nascita'
};


openModalee() {
  this.studenteB = {name: 'nome', surname: 'cognome',classe: 'classe',birthDate: 'data di nascita'}
  const modal = document.querySelector('#mAC');
  modal?.classList.add('show');
  modal?.setAttribute('style', 'display: block');
}

closeModalee() {
  const modal = document.querySelector('#mAC');
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
  this.arr.updateStudenteClasse(this.studenteA, this.studenteB)



}


  filteredArrayy: any[] = []
  personee: any[] = []
  ii: any
  searchQueryy: any



  openModale() {
    const modal = document.querySelector('#mEC');
    modal?.classList.add('show');
    modal?.setAttribute('style', 'display: block');
    this.filteredArrayy = this.selectedStudents
    console.log(this.selectedStudents)
    this.prendiPersonee()
  }

  closeModale() {
    const modal = document.querySelector('#mEC');
    modal?.classList.remove('show');
    modal?.setAttribute('style', 'display: none');
    this.modalChiuso()

  }


  elimina(studente: any) {

    studente.birthDate = new Date(studente.birthDate)
    this.prendi.eliminaStudente(this.prendi.studenteToId(studente.name, studente.surname, studente.classe))
  }

  deleteStudents(): void {
    for(let studente of this.selectedStudents){
      console.log(studente)
      this.elimina(studente);
    }
    this.arr.eliminaStudentiClasse(this.selectedStudents)
    this.closeModale();
  }

  performSearchh(): void {
    this.filteredArrayy = this.selectedStudents
    this.ii = 0
    this.filteredArrayy = this.filteredArray.filter(item => {
      this.ii = this.ii+1
      return this.personee[this.i - 1].toLowerCase().includes(this.searchQuery.toLowerCase());
    });
  }

  prendiPersonee(){
    for(let persona of this.filteredArray){
      this.persone.push(persona.name + " " + persona.surname + " " + persona.birthDate)
    }
  }


}
