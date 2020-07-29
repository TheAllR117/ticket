import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TransferenciasTotalesPage } from './transferencias-totales.page';

const routes: Routes = [
  {
    path: '',
    component: TransferenciasTotalesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TransferenciasTotalesPageRoutingModule {}
