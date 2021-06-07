import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab1Page } from './tab1.page';
import { ComponentsModule } from '../../components/components.module';
import player from 'lottie-web';
import { LottieModule } from 'ngx-lottie';

export function playerFactory() {
  return player;
}

@NgModule({
  imports: [
    ComponentsModule,
    IonicModule,
    CommonModule,
    FormsModule,
    RouterModule.forChild([{ path: '', component: Tab1Page }]),
    LottieModule.forRoot({ player: playerFactory })
  ],
  declarations: [Tab1Page]
})
export class Tab1PageModule {}
