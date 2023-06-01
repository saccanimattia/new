import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabellaClassiQuarteComponent } from './tabella-classi-quarte/tabella-classi-quarte.component';

const routes: Routes = [
  {path:'tabella', component:TabellaClassiQuarteComponent},
  {path:'classe/:id', component:TabellaClassiQuarteComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
