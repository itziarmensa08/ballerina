import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  private loading: HTMLIonLoadingElement | null = null;

  constructor(
    private loadingCtrl: LoadingController, 
    private translate: TranslateService
  ) {}

  async show(messageKey: string = 'general.loading') {
    const message = this.translate.instant(messageKey);

    if (!this.loading) {
      this.loading = await this.loadingCtrl.create({
        message,
        spinner: 'crescent',
        translucent: true,
        cssClass: 'global-loader'
      });
      await this.loading.present();
    }
  }

  async hide() {
    if (this.loading) {
      await this.loading.dismiss();
      this.loading = null;
    }
  }
}
