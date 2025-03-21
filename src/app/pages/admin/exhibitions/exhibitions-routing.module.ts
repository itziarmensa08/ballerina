import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ExhibitionsPage } from './exhibitions.page';

const routes: Routes = [
  {
    path: '',
    component: ExhibitionsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ExhibitionsPageRoutingModule {}
