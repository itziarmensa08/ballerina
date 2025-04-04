import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AdminGuard } from './guards/admin.guards';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'admin',
    loadChildren: () => import('./pages/admin/admin.module').then( m => m.AdminPageModule),
    canActivate: [AdminGuard]
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./pages/register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'competitions',
    loadChildren: () => import('./pages/competitions/competitions.module').then( m => m.CompetitionsPageModule)
  },
  {
    path: 'initiation',
    loadChildren: () => import('./pages/initiation/initiation.module').then( m => m.InitiationPageModule)
  },
  {
    path: 'trainings',
    loadChildren: () => import('./pages/trainings/trainings.module').then( m => m.TrainingsPageModule)
  },
  {
    path: 'contact',
    loadChildren: () => import('./pages/contact/contact.module').then( m => m.ContactPageModule)
  },
  {
    path: 'form-registration',
    loadChildren: () => import('./pages/form-registration/form-registration.module').then( m => m.FormRegistrationPageModule)
  },
  {
    path: 'try-it',
    loadChildren: () => import('./pages/try-it/try-it.module').then( m => m.TryItPageModule)
  },
  {
    path: 'validate/:token',
    loadChildren: () => import('./pages/validate/validate.module').then( m => m.ValidatePageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
