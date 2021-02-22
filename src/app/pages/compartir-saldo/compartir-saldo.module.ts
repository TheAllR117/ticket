import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CompartirSaldoPageRoutingModule } from './compartir-saldo-routing.module';

import { CompartirSaldoPage } from './compartir-saldo.page';
import player from 'lottie-web';
import { LottieModule } from 'ngx-lottie';
 
// Note we need a separate function as it's required
// by the AOT compiler.
export function playerFactory() {
  return player;
}

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    LottieModule.forRoot({ player: playerFactory }),
    IonicModule,
    CompartirSaldoPageRoutingModule
  ],
  declarations: [CompartirSaldoPage]
})
export class CompartirSaldoPageModule {}
