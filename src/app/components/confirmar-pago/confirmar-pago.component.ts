import { Component, OnInit, Input } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { UsuarioService } from '../../services/usuario.service';
import { PushService } from '../../services/push.service';

@Component({
  selector: 'app-confirmar-pago',
  templateUrl: './confirmar-pago.component.html',
  styleUrls: ['./confirmar-pago.component.scss'],
})
export class ConfirmarPagoComponent implements OnInit {
  @Input() price;
  // tslint:disable-next-line: variable-name
  @Input() id_gasoline;
  @Input() liters;
  // tslint:disable-next-line: variable-name
  @Input() id_station;
  @Input() membership;
  // tslint:disable-next-line: variable-name
  @Input() tr_membership;
  // tslint:disable-next-line: variable-name
  @Input() ids_client;
  // tslint:disable-next-line: variable-name
  @Input() ids_dispatcher;
  @Input() estacion;
  @Input() gasoline;
  // tslint:disable-next-line: variable-name
  @Input() id_schedule;

  // tslint:disable-next-line: variable-name
  @Input() id_dispatcher;
  // tslint:disable-next-line: variable-name
  @Input() id_time;

  membersh = '';

  constructor(private popoverCtrl: PopoverController, private usuarioService: UsuarioService, public pushServices: PushService) { }

  ngOnInit() {}

  onClick() {
    console.log(this.tr_membership);
    if (this.tr_membership === null) {
      this.membersh = '';
    } else {
      this.membersh = this.tr_membership;
    }

    this.usuarioService.confirmarCancelarPago(
      this.ids_dispatcher.toString(),
      this.ids_client.toString(),
      this.membersh.toString(),
      this.id_station.toString(),
      this.price.toString(),
      this.liters.toString(),
      this.id_dispatcher.toString(),
      this.id_gasoline.toString(),
      this.id_schedule.toString(),
      'true',
      this.id_time.toString()).subscribe(resp => {
        console.log(resp);
      });
    this.pushServices.abrirPop = true;
    this.popoverCtrl.dismiss();
  }

  cancelar() {
    console.log(this.tr_membership);
    if (this.tr_membership === null) {
      this.membersh = '';
    } else {
      this.membersh = this.membership;
    }
    this.usuarioService.confirmarCancelarPago(
      this.ids_dispatcher.toString(),
      this.ids_client.toString(),
      this.membersh.toString(),
      this.id_station.toString(),
      this.price.toString(),
      this.liters.toString(),
      this.id_dispatcher.toString(),
      this.id_gasoline.toString(),
      this.id_schedule.toString(),
      'false',
      this.id_time.toString()).subscribe(resp => {
        console.log(resp);
      });
    this.pushServices.abrirPop = true;
    this.popoverCtrl.dismiss();
  }

}
