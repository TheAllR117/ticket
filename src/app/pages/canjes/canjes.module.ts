import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CanjesPageRoutingModule } from './canjes-routing.module';

import { CanjesPage } from './canjes.page';

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
    CanjesPageRoutingModule,
    LottieModule.forRoot({ player: playerFactory }),
    ComponentsModule
  ],
  declarations: [CanjesPage]
})
export class CanjesPageModule {}
