import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';

import { ModalModule } from 'ngx-bootstrap/modal';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './components/desktop/main/main.component';
import { MapPanelComponent } from './components/desktop/main/map-panel/map-panel.component';
import { InformationPanelComponent } from './components/desktop/main/information-panel/information-panel.component';
import { ControlPanelComponent } from './components/desktop/main/control-panel/control-panel.component';
import { MobileMainComponent } from './components/mobile/mobile-main/mobile-main.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireModule } from 'angularfire2';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    MapPanelComponent,
    InformationPanelComponent,
    ControlPanelComponent,
    MobileMainComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    AngularFireModule.initializeApp({
      apiKey: "AIzaSyBPjGl2gNhiKKSYPHszXhKVorueDEwYyMg",
      authDomain: "lab-pv-system.firebaseapp.com",
      databaseURL: "https://lab-pv-system.firebaseio.com",
      projectId: "lab-pv-system",
      storageBucket: "lab-pv-system.appspot.com",
      messagingSenderId: "848306702179",
      appId: "1:848306702179:web:d4c90eea4ea8872190b556",
      measurementId: "G-2WLXSWS08K"
      }),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    ModalModule.forRoot(),
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
