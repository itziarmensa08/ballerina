import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FormRegistrationPage } from './form-registration.page';

const routes: Routes = [
  {
    path: '',
    component: FormRegistrationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FormRegistrationPageRoutingModule {}
