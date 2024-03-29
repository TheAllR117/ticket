import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { PaymentR } from '../../interfaces/interfaces';
import { ModalController, PopoverController } from '@ionic/angular';
import { Location } from '@angular/common';
import { CompartidoQrComponent } from '../../components/compartido-qr/compartido-qr.component';
import { CantidadAPagarComponent } from '../../components/cantidad-a-pagar/cantidad-a-pagar.component';


@Component({
  selector: 'app-transferencias-totales',
  templateUrl: './transferencias-totales.page.html',
  styleUrls: ['./transferencias-totales.page.scss'],
})
export class TransferenciasTotalesPage implements OnInit {

  payments: PaymentR[] = [];
  total = 0;

  //  variables animación
  animacion: any;
  // tslint:disable-next-line: ban-types
  public lottieConfig: Object;
  private anim: any;
  // tslint:disable-next-line: no-inferrable-types
  private animationSpeed: number = 1;

  tempp: any;

  constructor(
    private usuarioService: UsuarioService,
    private modalCtrl: ModalController,
    private popoverCtrl: PopoverController,
    // tslint:disable-next-line: variable-name
    private _location: Location
    ) {
      this.lottieConfig = {
        path: 'assets/animation/23210-wallet-money-added.json',
        autoplay: true,
        loopt: true
      };
    }

  ngOnInit() {
    this.usuarioService.transferenciasRecibidas().subscribe(respuesta => {
      if (respuesta.ok) {
        this.animacion = false;
        // tslint:disable-next-line: prefer-const
        for (let i of respuesta.payments) {
          this.total = this.total + i.balance;
        }
        this.payments = respuesta.payments;
      } else {
        this.animacion = true;
      }
    });
  }

  regresar() {
    this._location.back();
    // this.modalCtrl.dismiss();
  }

  handleAnimation(anim: any) {
    this.anim = anim;
  }

  stop() {
    this.anim.stop();
  }

  play() {
    this.anim.play();
  }

  pause() {
    this.anim.pause();
  }

  setSpeed(speed: number) {
    this.animationSpeed = speed;
    this.anim.setSpeed(speed);
  }

  // tslint:disable-next-line: variable-name
  async mostarCantidadAPagar(id_payment: string, nameStation: string, balanceInit: string) {
    const modal = await this.modalCtrl.create({
      component: CantidadAPagarComponent,
      componentProps: {
        id_payment,
        nameStation,
        balanceInit
      }
    });

    await modal.present();

    const { data } = await modal.onDidDismiss();
    this.tempp = data;
    // tslint:disable-next-line: no-string-literal
   if(this.tempp['cobrar']){
      const modal = await this.modalCtrl.create({
        component: CompartidoQrComponent,
        componentProps: {
          id_payment : this.tempp['id_payment'],
          balance : this.tempp['balance'],
        }
      });
  
      await modal.present();
  
      const { data } = await modal.onDidDismiss();

      if (data['actualizar']) {
        this.total = 0;
        this.usuarioService.transferenciasRecibidas().subscribe(respuesta => {
          if (respuesta.ok) {
            this.animacion = false;
            // tslint:disable-next-line: prefer-const
            for (let i of respuesta.payments) {
              this.total = this.total + i.balance;
            }
            this.payments = respuesta.payments;
          } else {
            this.animacion = true;
          }
        });
      }
    }
  }

  // tslint:disable-next-line: variable-name
  async mostarCompartir(id_payment: string) {
    const modal = await this.modalCtrl.create({
      component: CompartidoQrComponent,
      componentProps: {
        id_payment
      }
    });

    await modal.present();

    const { data } = await modal.onDidDismiss();
    // tslint:disable-next-line: no-string-literal
    if (data['actualizar']) {
      this.total = 0;
      this.usuarioService.transferenciasRecibidas().subscribe(respuesta => {
        if (respuesta.ok) {
          this.animacion = false;
          // tslint:disable-next-line: prefer-const
          for (let i of respuesta.payments) {
            this.total = this.total + i.balance;
          }
          this.payments = respuesta.payments;
        } else {
          this.animacion = true;
        }
      });
    }
  }

}
