import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminPage } from './admin.page';

const routes: Routes = [
  {
    path: '',
    component: AdminPage
  },
  {
    path: 'texts',
    loadChildren: () => import('./texts/texts.module').then( m => m.TextsPageModule)
  },
  {
    path: 'users',
    loadChildren: () => import('./users/users.module').then( m => m.UsersPageModule)
  },
  {
    path: 'images',
    loadChildren: () => import('./images/images.module').then( m => m.ImagesPageModule)
  },
  {
    path: 'competitions',
    loadChildren: () => import('./competitions/competitions.module').then( m => m.CompetitionsPageModule)
  },
  {
    path: 'exhibitions',
    loadChildren: () => import('./exhibitions/exhibitions.module').then( m => m.ExhibitionsPageModule)
  },
  {
    path: 'trainings-type',
    loadChildren: () => import('./trainings-type/trainings-type.module').then( m => m.TrainingsTypePageModule)
  },
  {
    path: 'gimnasts',
    loadChildren: () => import('./gimnasts/gimnasts.module').then( m => m.GimnastsPageModule)
  },
  {
    path: 'administrators',
    loadChildren: () => import('./administrators/administrators.module').then( m => m.AdministratorsPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminPageRoutingModule {}
