import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSlides, MenuController } from '@ionic/angular';

@Component({
  selector: 'app-slides',
  templateUrl: './slides.page.html',
  styleUrls: ['./slides.page.scss'],
})
export class SlidesPage implements OnInit {

  // tslint:disable-next-line: max-line-length
  titulo = 'REALIZA ABONOS A TU CUENTA';
  texto = 'Asiste a la estación de tu preferencia, realiza tu abono y sube tu comprobante para acumular saldo a tu cuenta.';
  constructor(public menuCtrl: MenuController) { }

  @ViewChild (IonSlides, { static: true }) protected slider: IonSlides;
  protected sliderIndex = 0;

  ngOnInit() {
    this.menuCtrl.enable (false);
  }

  protected async slideDidChange(): Promise<void> {
    this.sliderIndex = await this.slider.getActiveIndex();
    console.log(this.sliderIndex );
    if (this.sliderIndex === 0) {
      this.titulo = 'REALIZA ABONOS A TU CUENTA';
      // tslint:disable-next-line: max-line-length
      this.texto = 'Asiste a la estación de tu preferencia, realiza tu abono y sube tu comprobante para acumular saldo a tu cuenta.';
    } else if ( this.sliderIndex === 1) {
      this.titulo = 'ENVIA Y RECIBE SALDO';
      // tslint:disable-next-line: max-line-length
      this.texto = 'Selecciona "Enviar saldo" después ingresa el número de membresía de tu amigo, después escribe la cantidad que deseas enviar y presiona “Enviar”.';
    } else if ( this.sliderIndex === 2 ) {
      this.titulo = 'PAGA CON TU APP';
      this.texto = 'Asiste a la estación, realiza tu carga y paga con tus puntos, además por cada compra recibes beneficios.';
    }
    return Promise.resolve();
  }
}
