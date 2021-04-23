import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AbonosPageRoutingModule } from './abonos-routing.module';

import { AbonosPage } from './abonos.page';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AbonosPageRoutingModule,
    ComponentsModule
  ],
  declarations: [AbonosPage]
})
export class AbonosPageModule {}
