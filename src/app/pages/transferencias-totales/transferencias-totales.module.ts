import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TransferenciasTotalesPageRoutingModule } from './transferencias-totales-routing.module';

import { TransferenciasTotalesPage } from './transferencias-totales.page';
import { LottieAnimationViewModule } from 'ng-lottie';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TransferenciasTotalesPageRoutingModule,
    LottieAnimationViewModule.forRoot(),
  ],
  declarations: [TransferenciasTotalesPage]
})
export class TransferenciasTotalesPageModule {}
