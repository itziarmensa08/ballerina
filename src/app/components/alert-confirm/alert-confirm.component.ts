import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AlertType } from '../alert/alert.component';

@Component({
  selector: 'app-alert-confirm',
  templateUrl: './alert-confirm.component.html',
  styleUrls: ['./alert-confirm.component.scss'],
  standalone: false,
})
export class AlertConfirmComponent {
  @Input() type: AlertType = 'info';
  @Input() title: string = 'Delete item';
  @Input() message: string = 'Are you sure you want to delete this item? This action cannot be undone.';
  @Input() confirmText: string = 'Delete';
  @Input() cancelText: string = 'Cancel';
  @Output() close = new EventEmitter<void>();
  @Output() confirm = new EventEmitter<void>();

  constructor() {}

  getIcon(): string {
    const icons: Record<AlertType, string> = {
      success: 'checkmark-circle-outline',
      info: 'information-circle-outline',
      warning: 'alert-circle-outline',
      error: 'close-circle-outline',
    };
    return icons[this.type];
  }

  closeAlert() {
    const alertElement = document.querySelector('.alert-container');
    if (alertElement) {
      alertElement.classList.add('alert-exit');
    }

    const alertOverlay = document.querySelector('.alert-overlay');
    if (alertOverlay) {
      alertOverlay.classList.add('alert-exit');
    }

    setTimeout(() => {
      this.close.emit(); 
    }, 300);
  }

  confirmAlert() {
    this.closeAlert();
    this.confirm.emit();
  }
}