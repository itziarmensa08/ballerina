import { ApplicationRef, ComponentFactoryResolver, ComponentRef, Injectable, Injector } from '@angular/core';
import { CompetitionsModalComponent } from '../components/competitions-modal/competitions-modal.component';
import { TranslateService } from '@ngx-translate/core';
import { Competition } from './competitions.service';
import { Exhibition } from './exhibitions.service';

@Injectable({
  providedIn: 'root'
})
export class ModalCompetitionService {

  private alertComponentRef: ComponentRef<CompetitionsModalComponent> | null = null;

  constructor(
    private translate: TranslateService,
    private componentFactoryResolver: ComponentFactoryResolver,
    private appRef: ApplicationRef,
    private injector: Injector
  ) {}

  /**
   * Muestra una alerta y devuelve una promesa que se resuelve cuando el usuario confirma o cancela.
   * @param type - Tipo de alerta ('success', 'info', 'warning', 'error')
   * @param titleKey - Clave de traducción para el título
   * @param messageKey - Clave de traducción para el mensaje
   * @returns Promise<boolean> - `true` si el usuario confirma, `false` si cancela
   */
  showAlert(type: String, currentLanguage: string, competition?: Competition, exhibition?: Exhibition): Promise<boolean> {
    return new Promise<boolean>((resolve) => {
      this.createAlert(type, currentLanguage, competition, exhibition, resolve);
    });
  }

  private createAlert(type: String, currentLanguage: string, competition: Competition | undefined, exhibition: Exhibition | undefined, resolve: (value: boolean) => void) {
    this.closeAlert();

    const factory = this.componentFactoryResolver.resolveComponentFactory(CompetitionsModalComponent);
    this.alertComponentRef = factory.create(this.injector);

    this.alertComponentRef.instance.type = type;
    this.alertComponentRef.instance.competition = competition;
    this.alertComponentRef.instance.currentLang = currentLanguage;
    this.alertComponentRef.instance.exhibition = exhibition;

    this.alertComponentRef.instance.close.subscribe(() => {
      resolve(false);
      this.closeAlert();
    });

    this.appRef.attachView(this.alertComponentRef.hostView);
    document.body.appendChild(this.alertComponentRef.location.nativeElement);
  }

  /**
   * Cierra la alerta
   */
  closeAlert() {
    if (this.alertComponentRef) {
      this.appRef.detachView(this.alertComponentRef.hostView);
      this.alertComponentRef.destroy();
      this.alertComponentRef = null;
    }
  }
}
