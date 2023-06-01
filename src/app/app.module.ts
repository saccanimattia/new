import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TabellaClassiQuarteComponent } from './tabella-classi-quarte/tabella-classi-quarte.component';

@NgModule({
  declarations: [
    AppComponent,
    TabellaClassiQuarteComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
