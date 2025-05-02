import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreatePassPageRoutingModule } from './create-pass-routing.module';

import { CreatePassPage } from './create-pass.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreatePassPageRoutingModule,
    TranslateModule
  ],
  declarations: [CreatePassPage]
})
export class CreatePassPageModule {}
