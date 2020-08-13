import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { Payment } from '../../interfaces/interfaces';
import { ModalController, PopoverController, NavController } from '@ionic/angular';
import { LottieAnimationViewModule } from 'ng-lottie';
import { AbonarQrComponent } from '../../components/abonar-qr/abonar-qr.component';

@Component({
  selector: 'app-abonos-totales',
  templateUrl: './abonos-totales.page.html',
  styleUrls: ['./abonos-totales.page.scss'],
})
export class AbonosTotalesPage implements OnInit {

  payments: Payment[] = [];
  total = 0;

  // variables animación
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
    private navCtrl: NavController
    ) {
      LottieAnimationViewModule.forRoot();
      this.lottieConfig = {
        path: '../../../assets/animation/23741-home-delivery-man.json',
        autoplay: true,
        loopt: true
      };

     }

    ngOnInit() {
      this.usuarioService.obtener_puntos_por_estacion().subscribe(respuesta => {
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

    regresar(ruta: string) {
      this.navCtrl.back({ animated: true });
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
    async mostarAbonar(id_payment: string) {
      const modal = await this.modalCtrl.create({
        component: AbonarQrComponent,
        componentProps: {
          id_payment
        }
      });

      modal.present();
    }

}
