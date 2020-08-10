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

  constructor(private navCtrl: NavController, public pushServices: PushService, private applicationRef: ApplicationRef) { }

  ngOnInit() {
    this.pushServices.pushListener.subscribe(noti => {
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
