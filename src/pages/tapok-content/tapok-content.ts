import { Component } from '@angular/core';
import { IonicPage, NavController, ViewController, AlertController, NavParams, ModalController } from 'ionic-angular';
import { FireBaseService } from '../../providers/firebase-service';

@IonicPage()
@Component({
  selector: 'tapok-content',
  templateUrl: 'tapok-content.html'
})
export class TapokContent {

  event: any;
  key: any;
  user: any;
  User: any;
  userEventKeys: any;

  constructor(
    public navCtrl: NavController, public viewCtrl: ViewController, public alertCtrl: AlertController,
    public navParams: NavParams, public modalCtrl: ModalController, public firebaseService: FireBaseService
  ){
    this.user = this.firebaseService.getUser();
    this.key = navParams.get('param1');
    this.event = this.firebaseService.getSpecificEvent(this.key);
    this.event.forEach(events=> {
      this.event = events;
    });
    this.User = this.firebaseService.getUsers();

    this.User.map(users => {
      this.userEventKeys = users;
     }).subscribe(data => {
       data;
     });
  }

  editTapok(){
    let modal = this.modalCtrl.create('AddTapok', { tapok: this.event, label: "Edit Tapok" });
    modal.present();
  }

  deleteTapok(){
    let confirm = this.alertCtrl.create({
      title: 'Tapok Deleted',
      buttons: [ 'OK' ]
    });
    let alert = this.alertCtrl.create({
      title: 'Delete Tapok?',
      buttons: [ 
        {
          text: 'YES',
          handler: () => {
            this.firebaseService.deleteTapok(this.event.$key);
            this.navCtrl.setRoot('TapokPage');
            confirm.present();
          }
        },
        {
          text: 'NO',
        }
      ]
    });
    alert.present(); 
  }

  tapok(event){
    var status = "false";
    var tapok = event.tapok;
    var attendeeKey;
    var eventKey;
    var userKey;

    for(var attendees in event.attendees){
      if(event.attendees[attendees] == this.user){
        status = "true";
        attendeeKey = attendees;
        break;
      }
    }

    for(var userEventKey in this.userEventKeys){
      if(this.userEventKeys[userEventKey].key == event.$key){
        userKey = this.userEventKeys[userEventKey].$key;
      }
    }

    if(status == "false")
      tapok++;
    else
      tapok--;

    eventKey = {
      "key": event.$key
    }

    this.firebaseService.userTapok(eventKey, event.$key, status, tapok, this.user, attendeeKey, userKey);
  }
  
}