import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AbonosTotalesPageRoutingModule } from './abonos-totales-routing.module';

import { AbonosTotalesPage } from './abonos-totales.page';
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
    AbonosTotalesPageRoutingModule,
    LottieModule.forRoot({ player: playerFactory }),
    ComponentsModule
    
  ],
  declarations: [AbonosTotalesPage]
})
export class AbonosTotalesPageModule {}
