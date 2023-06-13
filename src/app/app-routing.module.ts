import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabellaClassiQuarteComponent } from './componenti/tabelle/tabella-classi-quarte/tabella-classi-quarte.component';
import { ClasseComponent } from './componenti/tabelle/classe/classe.component';
import { InputCreaClasseComponent } from './componenti/ModalClassi/input-crea-classe/input-crea-classe.component';
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
