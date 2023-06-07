import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatInputModule } from '@angular/material/input';
import { AppRoutingModule } from './app-routing.module';
import { MatButtonModule } from '@angular/material/button';
import { AppComponent } from './app.component';
import { TabellaClassiQuarteComponent } from './componenti/tabelle/tabella-classi-quarte/tabella-classi-quarte.component';
import { ClasseComponent } from './componenti/tabelle/classe/classe.component';
import { InputNuovoStudenteComponent } from './componenti/ModalStudentiClasse/input-nuovo-studente/input-nuovo-studente.component';
import { FormsModule } from '@angular/forms';
import { InputEliminaStudenteComponent } from './componenti/ModalStudentiClasse/input-elimina-studente/input-elimina-studente.component';
import { InputCreaClasseComponent } from './componenti/ModalClassi/input-crea-classe/input-crea-classe.component';
import { InputUpdateStudenteComponent } from './componenti/ModalStudentiClasse/input-update-studente/input-update-studente.component';
import { AllStudentiComponent } from './componenti/tabelle/all-studenti/all-studenti.component';
import { NavbarComponent } from './componenti/navbar/navbar.component';
import { InputNuovoAllStudentiComponent } from './componenti/ModalAllStudenti/input-nuovo-all-studenti/input-nuovo-all-studenti.component';
import { InputEliminaClasseComponent } from './componenti/ModalClassi/input-elimina-classe/input-elimina-classe.component';
import { InputUpdateClassiComponent } from './componenti/ModalClassi/input-update-classi/input-update-classi.component';
import { InputUpdateAllStudentiComponent } from './componenti/ModalAllStudenti/input-update-all-studenti/input-update-all-studenti.component';
import { InputEliminaAllStudentiComponent } from './componenti/ModalAllStudenti/input-elimina-all-studenti/input-elimina-all-studenti.component';


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
    InputEliminaClasseComponent,
    InputUpdateClassiComponent,
    InputUpdateAllStudentiComponent,
    InputEliminaAllStudentiComponent,
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
