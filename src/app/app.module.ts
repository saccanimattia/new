import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TabellaClassiQuarteComponent } from './tabella-classi-quarte/tabella-classi-quarte.component';
import { ClasseComponent } from './classe/classe.component';

@NgModule({
  declarations: [
    AppComponent,
    TabellaClassiQuarteComponent,
    ClasseComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
