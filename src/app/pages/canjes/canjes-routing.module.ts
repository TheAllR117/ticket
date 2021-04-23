import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CanjesPage } from './canjes.page';

const routes: Routes = [
  {
    path: '',
    component: CanjesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CanjesPageRoutingModule {}
