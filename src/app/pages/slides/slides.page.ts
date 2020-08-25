import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSlides, MenuController, IonRadioGroup } from '@ionic/angular';

@Component({
  selector: 'app-slides',
  templateUrl: './slides.page.html',
  styleUrls: ['./slides.page.scss'],
})
export class SlidesPage implements OnInit {

  @ViewChild (IonSlides, { static: true }) slider: IonSlides;
  @ViewChild('sliderSecundario', {static: true}) slidesSe: IonSlides;
  @ViewChild (IonRadioGroup, { static: true }) radio: IonRadioGroup;
  sliderIndex = 0;
  sliderIndex1 = 0;
  radioIndex = '0';

  activarOdesactivar1: any;
  activarOdesactivar2: any;

  constructor(public menuCtrl: MenuController) { }

  ngOnInit() {
    this.activarOdesactivar1 = false;
    this.activarOdesactivar2 = true;
    this.menuCtrl.enable (false);
  }

  async slideDidChange() {
    this.sliderIndex = await this.slider.getActiveIndex();

    if (this.sliderIndex === 0) {
      this.activarOdesactivar1 = false;
      this.activarOdesactivar2 = true;
    } else if (this.sliderIndex === 1) {
      this.activarOdesactivar1 = true;
      this.activarOdesactivar2 = true;
    } else {
      this.activarOdesactivar1 = true;
      this.activarOdesactivar2 = false;
    }

    this.radio.value = this.sliderIndex.toString();
    this.slidesSe.slideTo(this.sliderIndex);
  }

  async slideDidChange1() {
    this.sliderIndex1 = await this.slidesSe.getActiveIndex();
    this.radio.value = this.sliderIndex1.toString();
    this.slider.slideTo(this.sliderIndex1);
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
