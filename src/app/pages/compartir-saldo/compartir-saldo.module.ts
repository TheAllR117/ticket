import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CompartirSaldoPageRoutingModule } from './compartir-saldo-routing.module';

import { CompartirSaldoPage } from './compartir-saldo.page';
import { LottieAnimationViewModule } from 'ng-lottie';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    LottieAnimationViewModule.forRoot(),
    IonicModule,
    CompartirSaldoPageRoutingModule
  ],
  declarations: [CompartirSaldoPage]
})
export class CompartirSaldoPageModule {}
