import { Component, OnInit, Input, ApplicationRef } from '@angular/core';
import { ModalController, PopoverController } from '@ionic/angular';
import { UsuarioService } from '../../services/usuario.service';
import { StationQR } from '../../interfaces/interfaces';
import { PushService } from '../../services/push.service';
import { OSNotificationPayload } from '@ionic-native/onesignal/ngx';
import { ConfirmarPagoComponent } from '../confirmar-pago/confirmar-pago.component';


@Component({
  selector: 'app-abonar-qr',
  templateUrl: './abonar-qr.component.html',
  styleUrls: ['./abonar-qr.component.scss'],
})
export class AbonarQrComponent implements OnInit {
  // tslint:disable-next-line: variable-name
  @Input() id_payment;

  station: StationQR[] = [];
  resp: any;

  notificaciones: OSNotificationPayload[] = [];

  constructor(
    private modalCtrl: ModalController,
    private usuarioService: UsuarioService,
    public pushServices: PushService,
    private applicationRef: ApplicationRef,
    private popoverCtrl: PopoverController) {}

  ngOnInit() {
    this.usuarioService.informacionQrAbono(this.id_payment).subscribe( respuesta => {
      if (respuesta.ok) {
        // tslint:disable-next-line: max-line-length
        this.resp = 'membership=' + respuesta.membership + '&id_payment=' + respuesta.station.id + '&include_player_ids=' + this.pushServices.userId;
      } else {
        this.modalCtrl.dismiss();
      }
    });

    this.pushServices.pushListener.subscribe(noti => {
      // console.log(noti.additionalData.prices);
      // tslint:disable-next-line: no-string-literal
      this.mostrarPop(noti.additionalData.prices, noti.additionalData.producto, noti.additionalData.cantidad, noti.additionalData.estacion);
      this.applicationRef.tick();
    });
  }

  regresar() {
    this.modalCtrl.dismiss();
  }

  async mostrarPop(prices: string, producto: string, cantidad: string, estacion: string) {
    const popover = await this.popoverCtrl.create({
      component: ConfirmarPagoComponent,
      animated: true,
      cssClass: 'animate__animated animate__fadeIn',
      showBackdrop: true,
      backdropDismiss: false,
      componentProps: {
        prices,
        producto,
        cantidad,
        estacion
      }
    });

    await popover.present();
  }

  onClick() {
    this.popoverCtrl.dismiss();
  }

}
