import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, ViewController, NavParams } from 'ionic-angular';
import { FireBaseService } from '../../providers/firebase-service';
import { FirebaseApp } from 'angularfire2';
import { Content } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-about',
  templateUrl: 'chat-content.html'
})
export class ChatContent {
  @ViewChild (Content) content: Content;
	event: any;
  timestamp = '';
  user: any;
  Message: any;
  chat: any;
  eKey: any;
  //msgDisplay: any;
  List: any;
  listen: any;

  constructor(public viewCtrl: ViewController, public navCtrl: NavController, 
    public firebaseService: FireBaseService,public params: NavParams, public firebaseApp: FirebaseApp) {
    this.event = params.get('event');
    console.log(this.event);
    this.user = this.firebaseService.getUser();
    this.eKey=this.event.$key;
    this.List=this.firebaseService.getChat(this.eKey);
  }

  ionViewDidEnter(){
    setTimeout(() => {
      this.content.scrollToBottom(300);
    });    

    this.firebaseApp.database().ref("events/"+this.eKey+"/chat").on('value', snapshot => {
      setTimeout(() => {
        this.content.scrollToBottom(300);
      }); 
    });
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }
  
  sendMessage(){
    this.chat={
      "message": this.Message,
      "sentBy": this.firebaseService.getUser(),
      "timestamp": Date.now(),
    }
    setTimeout(() => {
      this.content.scrollToBottom(300);//300ms animation speed
    });
    this.firebaseService.sendMessage(this.chat, this.event.$key);
    this.Message="";
  }
}
