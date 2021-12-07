import { Component, OnInit, ApplicationRef } from '@angular/core';
import { NavController } from '@ionic/angular';
import { PushService } from '../../services/push.service';
import { OSNotificationPayload } from '@ionic-native/onesignal/ngx';

@Component({
  selector: 'app-notificaciones',
  templateUrl: './notificaciones.page.html',
  styleUrls: ['./notificaciones.page.scss'],
})
export class NotificacionesPage implements OnInit {

  notificaciones: OSNotificationPayload[] = [];
  messages: any;
  arrayMessages: any[] = [];
  arrayMessagesTemp: any[] = [];

  constructor(private navCtrl: NavController, public pushServices: PushService, private applicationRef: ApplicationRef) { }

  ngOnInit() {
    this.messages = JSON.stringify(this.pushServices.mensajes);
    this.messages = JSON.parse(this.messages)
    for(var i = 0; i < this.messages.length; i++){
      if((this.messages[i]['title'] != undefined)){
        this.arrayMessagesTemp.push(this.messages[i]['title'].toString());
      }
      if((this.messages[i]['body'] != undefined)){
        this.arrayMessagesTemp.push(this.messages[i]['body'].toString());
      }
      if((this.messages[i]['additionalData'] != undefined)){
        var temp = Object.values(this.messages[i]['additionalData']);
        this.arrayMessagesTemp.push(temp[0]);
        console.log(temp[0]);
      }

      this.arrayMessages.push(this.arrayMessagesTemp);
      this.arrayMessagesTemp = [];
    }

    console.log(this.arrayMessages);
    //console.log(JSON.parse(this.messages));
    this.pushServices.pushListener.subscribe(noti => {
      console.log(noti);
      this.notificaciones.unshift(noti);
      this.applicationRef.tick();
    });
  }

  async ionViewWillEnter() {
    await this.pushServices.guardarMensajes();
  }

  regresar() {
    this.navCtrl.back({animationDirection: 'back'});
  }

}
