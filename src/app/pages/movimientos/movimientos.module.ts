import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MovimientosPageRoutingModule } from './movimientos-routing.module';

import { MovimientosPage } from './movimientos.page';
import player from 'lottie-web';
import { LottieModule } from 'ngx-lottie';
import { ComponentsModule } from '../../components/components.module';

export function playerFactory() {
  return player;
}

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MovimientosPageRoutingModule,
    LottieModule.forRoot({ player: playerFactory }),
    ComponentsModule
  ],
  declarations: [MovimientosPage]
})
export class MovimientosPageModule {}
