import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TrainingsTypePage } from './trainings-type.page';

const routes: Routes = [
  {
    path: '',
    component: TrainingsTypePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TrainingsTypePageRoutingModule {}
