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
import { LanguageSelectorComponent } from './language-selector/language-selector.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    HeaderComponent,
    BreadcrumbsComponent,
    AlertComponent,
    AlertConfirmComponent,
    CustomFabComponent,
    CompetitionsModalComponent,
    LanguageSelectorComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    TranslateModule,
    FormsModule
  ],
  exports: [
    HeaderComponent,
    BreadcrumbsComponent,
    AlertComponent,
    AlertConfirmComponent,
    CustomFabComponent,
    CompetitionsModalComponent,
    LanguageSelectorComponent
  ]
})
export class ComponentsModule {}