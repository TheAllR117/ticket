import { Component, OnInit, Input, ApplicationRef } from '@angular/core';
import { ModalController, PopoverController } from '@ionic/angular';
import { UsuarioService } from '../../services/usuario.service';
import { PushService } from '../../services/push.service';
import { OSNotificationPayload } from '@ionic-native/onesignal/ngx';
import { ConfirmarPagoComponent } from '../confirmar-pago/confirmar-pago.component';

@Component({
  selector: 'app-compartido-qr',
  templateUrl: './compartido-qr.component.html',
  styleUrls: ['./compartido-qr.component.scss'],
})
export class CompartidoQrComponent implements OnInit {

  // tslint:disable-next-line: variable-name
  @Input() id_payment;

  resp: any;

  constructor(
    private modalCtrl: ModalController,
    private usuarioService: UsuarioService,
    public pushServices: PushService,
    private applicationRef: ApplicationRef,
    private popoverCtrl: PopoverController
  ) { }

  ngOnInit() {
    this.pushServices.abrirPop = true;

    this.usuarioService.informacionQrAbonoCompartido(this.id_payment).subscribe( respuesta => {
      if (respuesta.ok) {
        this.resp = JSON.stringify({
          membership: respuesta.membership,
          tr_membership: respuesta.tr_membership,
          id_station: respuesta.station.id,
          include_player_ids: this.pushServices.userId
        });

      } else {
        this.modalCtrl.dismiss();
      }
    });

    this.pushServices.pushListener.subscribe(async noti => {
      if (noti.additionalData) {
        if ( this.pushServices.abrirPop === true) {
          // console.log(noti.additionalData);
          this.pushServices.abrirPop = false;
          await this.mostrarPop(
            noti.additionalData.price,
            noti.additionalData.id_gasoline,
            noti.additionalData.liters,
            noti.additionalData.id_station,
            noti.additionalData.tr_membership,
            this.pushServices.userId,
            noti.additionalData.ids_dispatcher,
            noti.additionalData.estacion,
            noti.additionalData.gasoline,
            noti.additionalData.id_schedule,
            noti.additionalData.id_dispatcher,
            noti.additionalData.id_time,
            noti.additionalData.no_island,
            noti.additionalData.no_bomb
          );

          this.pushServices.idNotificacion = '';
        }
      }

      this.applicationRef.tick();
    });

  }

  regresar() {
    this.modalCtrl.dismiss({
      actualizar: true
    });
  }

  async mostrarPop(
    price: string,
    // tslint:disable-next-line: variable-name
    id_gasoline: string,
    liters: string,
    // tslint:disable-next-line: variable-name
    id_station: string,
    // tslint:disable-next-line: variable-name
    tr_membership: string,
    // tslint:disable-next-line: variable-name
    ids_client: string,
    // tslint:disable-next-line: variable-name
    ids_dispatcher: string,
    estacion: string,
    gasoline: string,
    // tslint:disable-next-line: variable-name
    id_schedule: string,
    // tslint:disable-next-line: variable-name
    id_dispatcher: string,
    // tslint:disable-next-line: variable-name
    id_time: string,
    // tslint:disable-next-line: variable-name
    no_island: string,
    // tslint:disable-next-line: variable-name
    no_bomb: string
    ) {
    const popover = await this.popoverCtrl.create({
      component: ConfirmarPagoComponent,
      animated: true,
      cssClass: 'animate__animated animate__fadeIn ion-justify-content-center',
      showBackdrop: true,
      backdropDismiss: false,
      componentProps: {
        price,
        id_gasoline,
        liters,
        id_station,
        tr_membership,
        ids_client,
        ids_dispatcher,
        estacion,
        gasoline,
        id_schedule,
        id_dispatcher,
        id_time,
        no_island,
        no_bomb
      }
    });

    await popover.present();
  }

  onClick() {
    this.popoverCtrl.dismiss();
  }

}
