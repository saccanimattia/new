import { Component, Input } from '@angular/core';
import { PrendiDatiService } from 'src/app/servizi/prendi-dati.service';

@Component({
  selector: 'app-all-studenti',
  templateUrl: './all-studenti.component.html',
  styleUrls: ['./all-studenti.component.scss']
})
export class AllStudentiComponent {
    studentiClasse: any[] = [];
    classi: any[] = [];
    c:any;
    classeId: any
    classe: any
    constructor(private prendi: PrendiDatiService) {

    }

    ngOnInit() {
      this.prendiStudenti()

    }

    trasformaClassi(){
      for(let studente of this.filteredArray){
        if(studente.classe != '')
        studente.classe = this.prendi.idToClass(studente.classe)
      }
    }




    async prendiStudenti(): Promise<void> {
        let a:any = await this.prendi.prendiStudenti()
        this.studentiClasse = a;
        this.filteredArray = this.studentiClasse
        this.trasformaClassi()
    }

    searchQuery: string = '';
    filteredArray: any[] = [];

    performSearch(): void {
      this.filteredArray = this.studentiClasse
      this.filteredArray = this.studentiClasse.filter(item => {
        return item.name.toLowerCase().includes(this.searchQuery.toLowerCase()) || item.surname.toLowerCase().includes(this.searchQuery.toLowerCase()) || item.birthDate.toLowerCase().includes(this.searchQuery.toLowerCase())
      });
      console.log(this.filteredArray)
    }
}
