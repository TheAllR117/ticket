import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TransferenciasTotalesPageRoutingModule } from './transferencias-totales-routing.module';

import { TransferenciasTotalesPage } from './transferencias-totales.page';
import player from 'lottie-web';
import { LottieModule } from 'ngx-lottie';

export function playerFactory() {
  return player;
}


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TransferenciasTotalesPageRoutingModule,
    LottieModule.forRoot({ player: playerFactory })
    
  ],
  declarations: [TransferenciasTotalesPage]
})
export class TransferenciasTotalesPageModule {}
