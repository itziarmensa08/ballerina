import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AlertConfirmComponent } from 'src/app/components/alert-confirm/alert-confirm.component';
import { AlertService } from 'src/app/services/alert.service';
import { Text, TextService } from 'src/app/services/text.service';

@Component({
  standalone: false,
  selector: 'app-texts',
  templateUrl: './texts.page.html',
  styleUrls: ['./texts.page.scss'],
})
export class TextsPage implements OnInit {

  breadcrumbs = [
    { label: 'Admin', navigate: '/admin', icon: 'settings-outline' },
    { label: 'Texts', navigate: '/admin/texts', icon: 'create-outline' }
  ];

  texts: Text[] = [];
  addingText: boolean = false;
  editingText: boolean = false;

  newText: Text = {
    key: '',
    value: { ca: '', es: '', en_US: '' }
  };

  constructor(
    private textService: TextService,
    private alertService: AlertService,
    private modalCtrl: ModalController
  ) { }

  ngOnInit() {
    this.loadTexts();
  }

  /**
   * Cargar todos los textos desde la API
   */
  loadTexts() {
    this.textService.getAllTexts().subscribe(response => {
      this.texts = response;
    });
  }

  /**
   * Alternar la vista para añadir un nuevo texto
   */
  toggleAddText() {
    this.addingText = !this.addingText;
    if (!this.addingText) {
      this.resetForm();
    }
  }

  toggleEditingText(text: Text) {
    this.newText = text;
    this.editingText = !this.editingText;
    if (!this.editingText) {
      this.resetForm();
    }
  }

  /**
   * Crear un nuevo texto
   */
  saveText() {
    if (!this.newText.key || !this.newText.value.ca || !this.newText.value.es || !this.newText.value.en_US) {
        this.alertService.showAlert('warning', 'alerts.required_title', 'alerts.required_message');
        return;
    }

    this.textService.createText(this.newText).subscribe({
        next: (response) => {
            this.texts.push(response);
            this.alertService.showAlert('success', 'alerts.text_added_title', 'alerts.text_added_message');
            this.toggleAddText();
        },
        error: (error) => {
            if (error.status === 400) {
                this.alertService.showAlert('error', 'alerts.duplicate_title', 'alerts.duplicate_message');
            } else {
                this.alertService.showAlert('error', 'alerts.error_title', 'alerts.error_message');
            }
        }
    });
  }

  /**
   * Actualizar un texto existente en un idioma específico
   */
  updateText() {
    /* this.textService.updateText(this.newText.key, this.newText.lang, this.newText.value).subscribe(updatedText => {
      const index = this.texts.findIndex(text => text.key === key);
      if (index !== -1) {
        this.texts[index] = updatedText;
        this.alertService.showAlert('success', 'Texto actualizado', `Se ha actualizado el texto en ${lang.toUpperCase()}`);
      }
    }, () => {
      this.alertService.showAlert('error', 'Error', 'No se pudo actualizar el texto');
    }); */
  }

  /**
   * Eliminar un texto
   */
  deleteText() {
    if (!confirm(`¿Seguro que deseas eliminar el texto "${this.newText.key}"?`)) return;

    this.textService.deleteText(this.newText.key).subscribe(() => {
      this.texts = this.texts.filter(text => text.key !== this.newText.key);
      this.alertService.showAlert('success', 'Texto eliminado', 'El texto ha sido eliminado correctamente');
    }, () => {
      this.alertService.showAlert('error', 'Error', 'No se pudo eliminar el texto');
    });
  }

  /**
   * Reiniciar el formulario de nuevo texto
   */
  resetForm() {
    this.newText = { key: '', value: { ca: '', es: '', en_US: '' } };
  }

  async confirmDelete() {
    const modal = await this.modalCtrl.create({
      component: AlertConfirmComponent,
      componentProps: {
        title: 'Delete item',
        message: 'Are you sure you want to delete this item? This action cannot be undone.',
        confirmText: 'Delete',
        cancelText: 'Cancel',
        confirmColor: 'danger'
      }
    });

    await modal.present();

    const { data } = await modal.onWillDismiss();
    if (data) {
      console.log('Item deleted');
    }
  }
}