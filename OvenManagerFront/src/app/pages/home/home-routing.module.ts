import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OvenPage } from './home.page';

const routes: Routes = [
  {
    path: '',
    component: OvenPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OvenPageRoutingModule {}
