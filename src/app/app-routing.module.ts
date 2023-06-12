import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabellaClassiQuarteComponent } from './componenti/tabelle/tabella-classi-quarte/tabella-classi-quarte.component';
import { ClasseComponent } from './componenti/tabelle/classe/classe.component';
import { InputNuovoStudenteComponent } from './componenti/ModalStudentiClasse/input-nuovo-studente/input-nuovo-studente.component';
import { InputEliminaStudenteComponent } from './componenti/ModalStudentiClasse/input-elimina-studente/input-elimina-studente.component';
import { InputCreaClasseComponent } from './componenti/ModalClassi/input-crea-classe/input-crea-classe.component';
import { InputUpdateStudenteComponent } from './componenti/ModalStudentiClasse/input-update-studente/input-update-studente.component';
import { AllStudentiComponent } from './componenti/tabelle/all-studenti/all-studenti.component';
import { HomeComponent } from './componenti/home/home.component';



const routes: Routes = [
  {path:"", component:HomeComponent},
  {path:"classi", component:TabellaClassiQuarteComponent},
  {path:"studenti", component:AllStudentiComponent},
  {path:"creaclasse", component:InputCreaClasseComponent},
  {path: 'classe/:id', component: ClasseComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
