import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CompartirSaldoPage } from './compartir-saldo.page';

const routes: Routes = [
  {
    path: '',
    component: CompartirSaldoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CompartirSaldoPageRoutingModule {}
