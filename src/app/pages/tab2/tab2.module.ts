import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab2Page } from './tab2.page';
import { ComponentsModule } from '../../components/components.module';
import player from 'lottie-web';
import { LottieModule } from 'ngx-lottie';
export function playerFactory() {
  return player;
}

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ComponentsModule,
    RouterModule.forChild([{ path: '', component: Tab2Page }]),
    LottieModule.forRoot({ player: playerFactory })
  ],
  declarations: [Tab2Page]
})
export class Tab2PageModule {}
