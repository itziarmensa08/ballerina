import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InitiationPageRoutingModule } from './initiation-routing.module';

import { InitiationPage } from './initiation.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InitiationPageRoutingModule,
    TranslateModule
  ],
  declarations: [InitiationPage]
})
export class InitiationPageModule {}
