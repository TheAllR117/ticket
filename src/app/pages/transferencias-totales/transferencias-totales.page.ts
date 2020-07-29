import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { PaymentR } from '../../interfaces/interfaces';
import { ModalController, PopoverController } from '@ionic/angular';
import { Location } from '@angular/common';
import { LottieAnimationViewModule } from 'ng-lottie';

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

  constructor(
    private usuarioService: UsuarioService,
    private modalCtrl: ModalController,
    private popoverCtrl: PopoverController,
    // tslint:disable-next-line: variable-name
    private _location: Location
    ) {
      LottieAnimationViewModule.forRoot();
      this.lottieConfig = {
        path: '../../../assets/animation/23210-wallet-money-added.json',
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

}
