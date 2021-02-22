import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MovimientosPage } from './movimientos.page';

const routes: Routes = [
  {
    path: '',
    component: MovimientosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MovimientosPageRoutingModule {}
