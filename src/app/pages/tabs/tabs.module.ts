import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LottieAnimationViewModule } from 'ng-lottie';

import { TabsPageRoutingModule } from './tabs-routing.module';

import { TabsPage } from './tabs.page';
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
    TabsPageRoutingModule,
    LottieAnimationViewModule.forRoot(),
    LottieModule.forRoot({ player: playerFactory })
  ],
  declarations: [TabsPage]
})
export class TabsPageModule {

}
