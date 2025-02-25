import { Component, EventEmitter, Input, Output } from '@angular/core';

export type AlertType = 'success' | 'info' | 'warning' | 'error';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss'],
  standalone: false
})
export class AlertComponent {
  @Input() type: AlertType = 'info';
  @Input() title: string = '';
  @Input() message: string = '';
  @Output() close = new EventEmitter<void>();

  getIcon(): string {
    const icons: Record<AlertType, string> = {
      success: 'checkmark-circle-outline',
      info: 'information-circle-outline',
      warning: 'alert-circle-outline',
      error: 'close-circle-outline',
    };
    return icons[this.type];
  }
}