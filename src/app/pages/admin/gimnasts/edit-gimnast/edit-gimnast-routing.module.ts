import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditGimnastPage } from './edit-gimnast.page';

const routes: Routes = [
  {
    path: '',
    component: EditGimnastPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditGimnastPageRoutingModule {}
