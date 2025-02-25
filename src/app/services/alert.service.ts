import { Injectable, ComponentRef, ApplicationRef, ComponentFactoryResolver, Injector } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AlertComponent, AlertType } from '../components/alert/alert.component';

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  private alertComponentRef: ComponentRef<AlertComponent> | null = null;

  constructor(
    private translate: TranslateService,
    private componentFactoryResolver: ComponentFactoryResolver,
    private appRef: ApplicationRef,
    private injector: Injector
  ) {}

  /**
   * Muestra una alerta con traducciones dinámicas.
   * @param type - Tipo de alerta ('success', 'info', 'warning', 'error')
   * @param titleKey - Clave de traducción para el título
   * @param messageKey - Clave de traducción para el mensaje
   */
  showAlert(type: AlertType, titleKey: string, messageKey: string, params: any = {}) {
    this.translate.get([titleKey, messageKey], params).subscribe(translations => {
      this.createAlert(type, translations[titleKey], translations[messageKey]);
    });
  }

  private createAlert(type: AlertType, title: string, message: string) {
    this.closeAlert();

    const factory = this.componentFactoryResolver.resolveComponentFactory(AlertComponent);
    this.alertComponentRef = factory.create(this.injector);

    this.alertComponentRef.instance.type = type;
    this.alertComponentRef.instance.title = title;
    this.alertComponentRef.instance.message = message;
    this.alertComponentRef.instance.close.subscribe(() => this.closeAlert());

    this.appRef.attachView(this.alertComponentRef.hostView);
    document.body.appendChild(this.alertComponentRef.location.nativeElement);

    // Ocultar la alerta automáticamente después de 5 segundos
    setTimeout(() => this.closeAlert(), 5000);
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