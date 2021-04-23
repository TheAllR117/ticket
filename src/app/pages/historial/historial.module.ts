import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HistorialPageRoutingModule } from './historial-routing.module';

import { HistorialPage } from './historial.page';
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
    HistorialPageRoutingModule,
    LottieModule.forRoot({ player: playerFactory }),
    ComponentsModule
  ],
  declarations: [HistorialPage]
})
export class HistorialPageModule {}
