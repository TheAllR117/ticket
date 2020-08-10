import { Injectable, EventEmitter } from '@angular/core';
import { OneSignal, OSNotification, OSNotificationPayload } from '@ionic-native/onesignal/ngx';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class PushService {

  public userId: string;

  mensajes: OSNotificationPayload[] = [];
  notificacionPagos: OSNotificationPayload[] = [];

  pushListener = new EventEmitter<OSNotificationPayload>();

  constructor(private oneSignal: OneSignal, private storage: Storage) {
    this.cargarMensajes();
  }

  async getNotificaciones() {
    await this.cargarMensajes();
    return [this.mensajes];
  }

  configuracionInicial() {
    this.oneSignal.startInit('91acd53f-d191-4b38-9fa9-2bbbdc95961e', '233436344393');

    this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.Notification);

    this.oneSignal.handleNotificationReceived().subscribe((noti) => {
    // do something when notification is received
    // console.log('Notificación recibida', noti);
    if (noti.payload.additionalData) {
      this.confirmacionPago(noti);
      console.log('Notificación de pago');
    } else {
      this.notificacionRecibida(noti);
      console.log('Notificación normal');
    }

    });

    this.oneSignal.handleNotificationOpened().subscribe((noti) => {
      // do something when a notification is opened
      console.log('Notificación recibida', noti);
    });

    // obtener id del suscriptor
    this.oneSignal.getIds().then( info => {
      this.userId = info.userId;
    });

    this.oneSignal.endInit();
  }

  async notificacionRecibida(noti: OSNotification) {
    await this.cargarMensajes();
    const payload = noti.payload;
    const existePush = this.mensajes.find(mensaje => mensaje.notificationID === payload.notificationID);

    if (existePush) {
      return;
    }

    this.mensajes.unshift(payload);
    this.pushListener.emit(payload);
    this.guardarMensajes();
  }

  async confirmacionPago(noti: OSNotification) {
    const payloadPagos = noti.payload;
    this.pushListener.emit(payloadPagos);
  }

  guardarMensajes() {
    this.storage.set('notificaciones', this.mensajes);
  }

  async cargarMensajes() {
    this.mensajes = await this.storage.get('notificaciones') || [];
  }

}
