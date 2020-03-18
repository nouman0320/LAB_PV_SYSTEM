import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

import {take} from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

import '@firebase/messaging';

@Injectable({
  providedIn: 'root'
})
export class MessagingService {

  messaging:any;
  currentMessage = new BehaviorSubject(null);

  constructor(private db: AngularFireDatabase, private afAuth: AngularFireAuth) {
    /*
    this.messaging = firebase.messaging();
    this.messaging.usePublicVapidKey("BKvOdeV5eFUIyT-GIciYteOXpHlM_G4NfIB5lyn5nMjByDClYYkem1Q7PI5hsBdK91MEkVhqAuqw6QQRaTDKHno");
    */
    
   }

  private updateToken(token){
    /*
    this.afAuth.authState.subscribe(user => {
      if(!user) return;

      const data = { [user.uid]: token};
      this.db.object('fcmTokens/').update(data);
    });*/
  }

  getPermission(){
    /*
    this.messaging.requestPermission().then(()=>{
      console.log('Notification permission granted.');
      return this.messaging.getToken();
    })
    .then(token => {
      console.log(token);
      this.updateToken(token);
    })
    .catch((err)=>{
      console.log("Unable to get permission to notify.", err);
    });
    */
  }

  receiveMessage(){
    /*
    console.log("registering receive message");

    this.messaging.onMessage((payload)=>{
      console.log("Message received. ", payload);
      this.currentMessage.next(payload);
    });
    */
  }
}
