import { Component, OnInit, Input } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { UsuarioService } from '../../services/usuario.service';
import { PushService } from '../../services/push.service';
import { PostsService } from '../../services/posts.service';

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
  // tslint:disable-next-line: variable-name
  @Input() no_island;
  // tslint:disable-next-line: variable-name
  @Input() no_bomb;

  membersh = '';

  constructor(
    private popoverCtrl: PopoverController,
    private usuarioService: UsuarioService,
    public pushServices: PushService,
    private postsService: PostsService) { }

  ngOnInit() {}

  onClick() {
    // console.log(this.tr_membership);
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
      this.id_time.toString(),
      this.no_island.toString(),
      this.no_bomb.toString()).subscribe(resp => {
        // tslint:disable-next-line: no-string-literal
        if (resp['ok']) {
          // tslint:disable-next-line: no-string-literal
          this.postsService.mostrarPop('21349-tick-green', 'Confirmación de pago', resp['message'], 2500);
        } else {
          // tslint:disable-next-line: no-string-literal
          this.postsService.mostrarPop('14331-error', 'Confirmación de pago', resp['message'], 1950);
        }

      });
    this.pushServices.abrirPop = true;
    this.popoverCtrl.dismiss();
  }

  cancelar() {
    // console.log(this.tr_membership);
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
      this.id_time.toString(),
      this.no_island.toString(),
      this.no_bomb.toString()).subscribe(resp => {
        // tslint:disable-next-line: no-string-literal
        if (resp['ok']) {
          // tslint:disable-next-line: no-string-literal
          this.postsService.mostrarPop('21349-tick-green', 'Cancelación de pago', resp['message'], 2500);
        } else {
          // tslint:disable-next-line: no-string-literal
          this.postsService.mostrarPop('14331-error', 'Cancelación de pago', resp['message'], 1950);
        }
      });
    this.pushServices.abrirPop = true;
    this.popoverCtrl.dismiss();
  }

}