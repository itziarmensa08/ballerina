import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TextsPageRoutingModule } from './texts-routing.module';

import { TextsPage } from './texts.page';
import { ComponentsModule } from 'src/app/components/components.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TextsPageRoutingModule,
    ComponentsModule,
    TranslateModule
  ],
  declarations: [TextsPage]
})
export class TextsPageModule {}
