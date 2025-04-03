import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TryItPage } from './try-it.page';

const routes: Routes = [
  {
    path: '',
    component: TryItPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TryItPageRoutingModule {}
