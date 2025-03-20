import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CompetitionsPageRoutingModule } from './competitions-routing.module';

import { CompetitionsPage } from './competitions.page';
import { ComponentsModule } from 'src/app/components/components.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CompetitionsPageRoutingModule,
    ComponentsModule,
    TranslateModule
  ],
  declarations: [CompetitionsPage]
})
export class CompetitionsPageModule {}
