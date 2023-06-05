import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InputCreaClasseComponent } from './componenti/input-crea-classe/input-crea-classe.component';
import { InputNuovoStudenteComponent } from './componenti/input-nuovo-studente/input-nuovo-studente.component';
import { InputUpdateStudenteComponent } from './componenti/input-update-studente/input-update-studente.component';
import { InputEliminaStudenteComponent } from './componenti/input-elimina-studente/input-elimina-studente.component';

const routes: Routes = [
  {path:"creaclasse", component:InputCreaClasseComponent},
  {path:"creastudente", component:InputNuovoStudenteComponent},
  {path:"modificastudente", component:InputUpdateStudenteComponent},
  {path:"eliminastudente", component:InputEliminaStudenteComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
