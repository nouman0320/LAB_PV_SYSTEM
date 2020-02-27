import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './components/desktop/main/main.component';
import { MapPanelComponent } from './components/desktop/main/map-panel/map-panel.component';
import { InformationPanelComponent } from './components/desktop/main/information-panel/information-panel.component';
import { ControlPanelComponent } from './components/desktop/main/control-panel/control-panel.component';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    MapPanelComponent,
    InformationPanelComponent,
    ControlPanelComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
