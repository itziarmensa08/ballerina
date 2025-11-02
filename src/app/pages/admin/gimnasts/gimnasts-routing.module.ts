import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GimnastsPage } from './gimnasts.page';

const routes: Routes = [
  {
    path: '',
    component: GimnastsPage
  },
  {
    path: 'edit-gimnast/:id',
    loadChildren: () => import('./edit-gimnast/edit-gimnast.module').then( m => m.EditGimnastPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GimnastsPageRoutingModule {}
