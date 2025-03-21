import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ExhibitionsPageRoutingModule } from './exhibitions-routing.module';

import { ExhibitionsPage } from './exhibitions.page';
import { ComponentsModule } from 'src/app/components/components.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ExhibitionsPageRoutingModule,
    ComponentsModule,
    TranslateModule
  ],
  declarations: [ExhibitionsPage]
})
export class ExhibitionsPageModule {}
