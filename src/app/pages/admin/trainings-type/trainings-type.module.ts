import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TrainingsTypePageRoutingModule } from './trainings-type-routing.module';

import { TrainingsTypePage } from './trainings-type.page';
import { ComponentsModule } from 'src/app/components/components.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TrainingsTypePageRoutingModule,
    ComponentsModule,
    TranslateModule
  ],
  declarations: [TrainingsTypePage]
})
export class TrainingsTypePageModule {}
