import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreatePassPage } from './create-pass.page';

const routes: Routes = [
  {
    path: '',
    component: CreatePassPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreatePassPageRoutingModule {}
