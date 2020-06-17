import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { CarboniteModule } from './carbonite/carbonite.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    CarboniteModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
