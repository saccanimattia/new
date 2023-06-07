import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InputCreaClasseComponent } from './componenti/input-crea-classe/input-crea-classe.component';
import { InputNuovoStudenteComponent } from './componenti/input-nuovo-studente/input-nuovo-studente.component';
import { InputUpdateStudenteComponent } from './componenti/ModalStudentiClasse/input-update-studente/input-update-studente.component';
import { InputEliminaStudenteComponent } from './componenti/input-elimina-studente/input-elimina-studente.component';
import { ClasseComponent } from './componenti/classe/classe.component';
import { TabellaClassiQuarteComponent } from './componenti/tabella-classi-quarte/tabella-classi-quarte.component';
import { AppComponent } from './app.component';
import { AllStudentiComponent } from './componenti/all-studenti/all-studenti.component';
import { NavbarComponent } from './componenti/navbar/navbar.component';

const routes: Routes = [
  {path:"classi", component:TabellaClassiQuarteComponent},
  {path:"studenti", component:AllStudentiComponent},
  {path:"creaclasse", component:InputCreaClasseComponent},
  {path:"creastudente", component:InputNuovoStudenteComponent},
  {path:"modificastudente", component:InputUpdateStudenteComponent},
  {path:"eliminastudente", component:InputEliminaStudenteComponent},
  {path: 'classe/:id', component: ClasseComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
