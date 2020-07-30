import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { UsuarioService } from '../../services/usuario.service';
import { Contact, Payment } from '../../interfaces/interfaces';
import { PostsService } from '../../services/posts.service';


@Component({
  selector: 'app-enviar-cantida',
  templateUrl: './enviar-cantida.component.html',
  styleUrls: ['./enviar-cantida.component.scss'],
})
export class EnviarCantidaComponent implements OnInit {
  @Input() membership;
  contact: Contact;
  payments: Payment[] = [];
  mostrarContactos = false;
  posicion = 0;
  gasopesos = 0;
  cantidad = 100;
  select: null;

  sendCan = {
    id_contact: '',
    balance: 100,
    id_payment: ''
  };
  constructor(
    private modalCtrl: ModalController,
    private usuarioService: UsuarioService,
    private postsService: PostsService
    ) { }

  ngOnInit() {
    this.usuarioService.obtener_puntos_por_estacion().subscribe(respuesta => {
      if (respuesta.ok) {
        this.payments = respuesta.payments;
      } else {

      }
    });

    this.usuarioService.burcar_usuario( this.membership ).subscribe( resp => {
      if (resp.ok) {
        this.contact = resp.contact;
        this.mostrarContactos = true;
      } else {
        this.modalCtrl.dismiss();
      }
    });
  }

  ionViewWillEnter() {
  }

  regresar() {
    this.modalCtrl.dismiss();
  }

  seleccion(event) {
    if (event.detail.value !== null) {
      this.gasopesos = this.payments[event.detail.value].balance;
      this.posicion = event.detail.value;
      this.sendCan.balance = 100;
    }
  }

  enviarSaldo() {
    this.postsService.presentLoading('Espere por favor...');

    this.usuarioService.enviarSaldo(
      this.contact.id.toString(),
      this.sendCan.balance.toString(),
      this.payments[this.posicion].id.toString()
      ).subscribe(respuestaEnvio => {
        this.postsService.loading.dismiss();
        if (respuestaEnvio.ok) {
          // volvemos el saldo en 0
          this.gasopesos = 0;
          // el select se reinicia
          this.select = null;
          // volvemos a obtener los puntos por estación
          this.usuarioService.obtener_puntos_por_estacion().subscribe(respuesta => {
            if (respuesta.ok) {
              this.payments = respuesta.payments;
            }
          });
          this.postsService.mostrarPop('21349-tick-green', 'Envio de saldo', respuestaEnvio.message, 2500);
        } else {
          this.postsService.mostrarPop('14331-error', 'Envio de saldo', respuestaEnvio.message, 1900);
        }

      });
  }
}
