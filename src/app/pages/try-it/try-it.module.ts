import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TryItPageRoutingModule } from './try-it-routing.module';

import { TryItPage } from './try-it.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TryItPageRoutingModule,
    TranslateModule
  ],
  declarations: [TryItPage]
})
export class TryItPageModule {}
