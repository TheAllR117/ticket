import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AbonosTotalesPageRoutingModule } from './abonos-totales-routing.module';

import { AbonosTotalesPage } from './abonos-totales.page';
import { LottieAnimationViewModule } from 'ng-lottie';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AbonosTotalesPageRoutingModule,
    LottieAnimationViewModule.forRoot(),
  ],
  declarations: [AbonosTotalesPage]
})
export class AbonosTotalesPageModule {}
