import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GimnastsPageRoutingModule } from './gimnasts-routing.module';

import { GimnastsPage } from './gimnasts.page';
import { TranslateModule } from '@ngx-translate/core';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GimnastsPageRoutingModule,
    ComponentsModule,
    TranslateModule
  ],
  declarations: [GimnastsPage]
})
export class GimnastsPageModule {}
