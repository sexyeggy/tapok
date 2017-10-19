import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { ChatContent } from '../chat-content/chat-content';

@IonicPage()
@Component({
  selector: 'page-about',
  templateUrl: 'event.html'
})
export class EventPage {

  constructor(public navCtrl: NavController) {

  }

  openChatContent(){
    this.navCtrl.push(ChatContent, {})
  }
}