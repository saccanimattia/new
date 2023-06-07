import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatInputModule } from '@angular/material/input';
import { AppRoutingModule } from './app-routing.module';
import { MatButtonModule } from '@angular/material/button';
import { AppComponent } from './app.component';
import { TabellaClassiQuarteComponent } from './componenti/tabella-classi-quarte/tabella-classi-quarte.component';
import { ClasseComponent } from './componenti/classe/classe.component';
import { InputNuovoStudenteComponent } from './componenti/input-nuovo-studente/input-nuovo-studente.component';
import { FormsModule } from '@angular/forms';
import { InputEliminaStudenteComponent } from './componenti/input-elimina-studente/input-elimina-studente.component';
import { InputCreaClasseComponent } from './componenti/input-crea-classe/input-crea-classe.component';
import { InputUpdateStudenteComponent } from './componenti/input-update-studente/input-update-studente.component';
import { AllStudentiComponent } from './componenti/all-studenti/all-studenti.component';
import { NavbarComponent } from './componenti/navbar/navbar.component';
import { InputNuovoAllStudentiComponent } from './componenti/input-nuovo-all-studenti/input-nuovo-all-studenti.component';



@NgModule({
  declarations: [
    AppComponent,
    TabellaClassiQuarteComponent,
    ClasseComponent,
    InputNuovoStudenteComponent,
    InputEliminaStudenteComponent,
    InputCreaClasseComponent,
    InputUpdateStudenteComponent,
    AllStudentiComponent,
    NavbarComponent,
    InputNuovoAllStudentiComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatInputModule,
    FormsModule,
    MatButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
