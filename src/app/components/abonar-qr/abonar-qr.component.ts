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
  @Input() balance;

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
    this.pushServices.abrirPop = true;

    this.usuarioService.informacionQrAbono(this.id_payment, this.balance).subscribe( respuesta => {
      if (respuesta.ok) {
        
       
        this.resp = JSON.stringify({
          membership: respuesta.membership,
          tr_membership: '',
          id_station: respuesta.station.id,
          balance: respuesta.balance,
          include_player_ids: this.pushServices.userId,
        });

        console.log(respuesta);

      } else {
        this.modalCtrl.dismiss();
      }
    });

    this.pushServices.pushListener.subscribe(async noti  => {
      //console.log(noti.additionalData);
      if (noti.additionalData && noti.title == 'Pago con QR') {
        if ( this.pushServices.abrirPop === true) {
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
            noti.additionalData.no_bomb,
            noti.additionalData.sale,
            noti.additionalData.balance
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
    no_bomb: string,
    sale: string,
    balance:string
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
        no_bomb,
        sale,
        balance
      }
    });

    await popover.present();
  }

   async lalo(){
    await this.mostrarPop(
        '112',
        '112.34',
        '112.34',
        '112.34',
        '',
        this.pushServices.userId,
        '112.34',
        '112.34',
        '112.34',
        '112.34',
        '112.34',
        '112.34',
        '112.34',
        '112.34',
        '112.34',
       ''
    );
    
  
  }

  onClick() {
    this.popoverCtrl.dismiss();
  }

}
