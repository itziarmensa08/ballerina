import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { HeaderComponent } from './header/header.component';
import { TranslateModule } from '@ngx-translate/core';
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { AlertComponent } from './alert/alert.component';

@NgModule({
  declarations: [
    HeaderComponent,
    BreadcrumbsComponent,
    AlertComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    TranslateModule
  ],
  exports: [
    HeaderComponent,
    BreadcrumbsComponent,
    AlertComponent
  ]
})
export class ComponentsModule {}