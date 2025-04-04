import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ValidatePageRoutingModule } from './validate-routing.module';

import { ValidatePage } from './validate.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ValidatePageRoutingModule,
    TranslateModule
  ],
  declarations: [ValidatePage]
})
export class ValidatePageModule {}
