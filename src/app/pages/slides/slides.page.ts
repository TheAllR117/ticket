import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSlides, MenuController, IonRadioGroup } from '@ionic/angular';

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

  @ViewChild (IonSlides, { static: true }) slider: IonSlides;
  @ViewChild('sliderSecundario', {static: true}) slidesSe: IonSlides;
  @ViewChild (IonRadioGroup, { static: true }) radio: IonRadioGroup;
  sliderIndex = 0;
  sliderIndex1 = 0;
  radioIndex = '0';

  ngOnInit() {
    this.menuCtrl.enable (false);
  }

  protected async slideDidChange(): Promise<void> {
    this.sliderIndex = await this.slider.getActiveIndex();
    // console.log(this.radio.value);
    this.radio.value = this.sliderIndex.toString();
    this.slidesSe.slideTo(this.sliderIndex);
    return Promise.resolve();
  }

  protected async slideDidChange1(): Promise<void> {
    this.sliderIndex1 = await this.slidesSe.getActiveIndex();
    this.radio.value = this.sliderIndex1.toString();
    this.slider.slideTo(this.sliderIndex1);
    return Promise.resolve();
  }

  activo(slide: number) {
    this.slider.slideTo(slide);
    this.slidesSe.slideTo(slide);
  }

  async regresar() {
    this.sliderIndex = await this.slider.getActiveIndex();
    this.sliderIndex1 = await this.slidesSe.getActiveIndex();
    if (this.sliderIndex > 0 && this.sliderIndex1 > 0) {
      this.slider.slideTo(this.sliderIndex - 1);
      this.slidesSe.slideTo(this.sliderIndex - 1);
    }
  }

  async siguiente() {
    this.sliderIndex = await this.slider.getActiveIndex();
    this.sliderIndex1 = await this.slidesSe.getActiveIndex();
    if (this.sliderIndex < 2) {
      this.slider.slideTo(this.sliderIndex + 1);
      this.slidesSe.slideTo(this.sliderIndex + 1);
    }
  }
}
