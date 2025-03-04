import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ImagesPageRoutingModule } from './images-routing.module';

import { ImagesPage } from './images.page';
import { ComponentsModule } from 'src/app/components/components.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ImagesPageRoutingModule,
    ComponentsModule,
    TranslateModule
  ],
  declarations: [ImagesPage]
})
export class ImagesPageModule {}
