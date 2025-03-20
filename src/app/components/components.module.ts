import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { HeaderComponent } from './header/header.component';
import { TranslateModule } from '@ngx-translate/core';
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { AlertComponent } from './alert/alert.component';
import { AlertConfirmComponent } from './alert-confirm/alert-confirm.component';
import { CustomFabComponent } from './custom-fab/custom-fab.component';
import { CompetitionsModalComponent } from './competitions-modal/competitions-modal.component';

@NgModule({
  declarations: [
    HeaderComponent,
    BreadcrumbsComponent,
    AlertComponent,
    AlertConfirmComponent,
    CustomFabComponent,
    CompetitionsModalComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    TranslateModule
  ],
  exports: [
    HeaderComponent,
    BreadcrumbsComponent,
    AlertComponent,
    AlertConfirmComponent,
    CustomFabComponent,
    CompetitionsModalComponent
  ]
})
export class ComponentsModule {}