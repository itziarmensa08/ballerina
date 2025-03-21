import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ExhibitionsPageRoutingModule } from './exhibitions-routing.module';

import { ExhibitionsPage } from './exhibitions.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ExhibitionsPageRoutingModule
  ],
  declarations: [ExhibitionsPage]
})
export class ExhibitionsPageModule {}
