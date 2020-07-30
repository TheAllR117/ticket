import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AbonosTotalesPage } from './abonos-totales.page';

const routes: Routes = [
  {
    path: '',
    component: AbonosTotalesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AbonosTotalesPageRoutingModule {}
