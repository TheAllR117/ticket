import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AbonosPage } from './abonos.page';

const routes: Routes = [
  {
    path: '',
    component: AbonosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AbonosPageRoutingModule {}
