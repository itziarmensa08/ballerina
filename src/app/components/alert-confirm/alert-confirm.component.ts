import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-alert-confirm',
  templateUrl: './alert-confirm.component.html',
  styleUrls: ['./alert-confirm.component.scss'],
  standalone: false,
})
export class AlertConfirmComponent {
  @Input() title: string = 'Delete item';
  @Input() message: string = 'Are you sure you want to delete this item? This action cannot be undone.';
  @Input() confirmText: string = 'Delete';
  @Input() cancelText: string = 'Cancel';
  @Input() confirmColor: string = 'danger';

  constructor(private modalCtrl: ModalController) {}

  dismiss(result: boolean) {
    this.modalCtrl.dismiss(result);
  }
}