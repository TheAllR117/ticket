import { Injectable, EventEmitter } from '@angular/core';
import { OneSignal, OSNotification, OSNotificationPayload } from '@ionic-native/onesignal/ngx';
import { Storage } from '@ionic/storage';
import { waitForAsync } from '@angular/core/testing';

@Injectable({
  providedIn: 'root'
})
export class PushService {

  public userId: string;

  mensajes: OSNotificationPayload[] = [];
  notificacionPagos: OSNotificationPayload[] = [];

  pushListener = new EventEmitter<OSNotificationPayload>();

  idNotificacion = '';

  public abrirPop: any;

  constructor(private oneSignal: OneSignal, private storage: Storage) {
    this.cargarMensajes();
  }

  async getNotificaciones() {
    await this.cargarMensajes();
    return [this.mensajes];
  }

  configuracionInicial() {
    this.oneSignal.startInit('62450fc4-bb2b-4f2e-a748-70e8300c6ddb', '695838362156');

    this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.Notification);

    this.oneSignal.handleNotificationReceived().subscribe(async (noti) => {
    // do something when notification is received
    // console.log('Notificación recibida', noti);
    //if (noti.payload.additionalData) {
    if (noti.payload.title.toString() === 'Pago con QR') {
      await this.confirmacionPago(noti);
      //console.log('Notificación de pago');
    } else {
      await this.notificacionRecibida(noti);
      //console.log('Notificación normal');
    }

    });

    this.oneSignal.handleNotificationOpened().subscribe((noti) => {
      // do something when a notification is opened
      // console.log('Notificación recibida', noti);
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
    if (this.idNotificacion === '') {

      this.idNotificacion = payloadPagos.notificationID;
      this.pushListener.emit(payloadPagos);

    } else if (this.idNotificacion === payloadPagos.notificationID) {
      this.idNotificacion = '';
      //console.log('Notificación repetida');
    } else {
      this.idNotificacion = '';
    }

  }

  guardarMensajes() {
    this.storage.set('notificaciones', this.mensajes);
  }

  async cargarMensajes() {
    this.mensajes = await this.storage.get('notificaciones') || [];
  }

}
