import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdministratorsPageRoutingModule } from './administrators-routing.module';

import { AdministratorsPage } from './administrators.page';
import { ComponentsModule } from 'src/app/components/components.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdministratorsPageRoutingModule,
    ComponentsModule,
    TranslateModule
  ],
  declarations: [AdministratorsPage]
})
export class AdministratorsPageModule {}
