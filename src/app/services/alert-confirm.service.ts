import { Injectable, ComponentRef, ApplicationRef, ComponentFactoryResolver, Injector } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AlertType } from '../components/alert/alert.component';
import { AlertConfirmComponent } from '../components/alert-confirm/alert-confirm.component';

@Injectable({
  providedIn: 'root'
})
export class AlertConfirmService {
  private alertComponentRef: ComponentRef<AlertConfirmComponent> | null = null;

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
  showAlert(type: AlertType, titleKey: string, messageKey: string): Promise<boolean> {
    return new Promise<boolean>((resolve) => {
      this.translate.get([titleKey, messageKey]).subscribe(translations => {
        this.createAlert(type, translations[titleKey], translations[messageKey], resolve);
      });
    });
  }

  private createAlert(type: AlertType, title: string, message: string, resolve: (value: boolean) => void) {
    this.closeAlert();

    const factory = this.componentFactoryResolver.resolveComponentFactory(AlertConfirmComponent);
    this.alertComponentRef = factory.create(this.injector);

    this.alertComponentRef.instance.type = type;
    this.alertComponentRef.instance.title = title;
    this.alertComponentRef.instance.message = message;

    this.alertComponentRef.instance.confirm.subscribe(() => {
      resolve(true);  // Usuario confirmó
      this.closeAlert();
    });

    this.alertComponentRef.instance.close.subscribe(() => {
      resolve(false); // Usuario canceló
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