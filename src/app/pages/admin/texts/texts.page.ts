import { Component, OnInit } from '@angular/core';
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

  newText: Text = {
    key: '',
    value: { ca: '', es: '', en_US: '' }
  };

  constructor(
    private textService: TextService,
    private alertService: AlertService
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
  updateText(key: string, lang: string, value: string) {
    this.textService.updateText(key, lang, value).subscribe(updatedText => {
      const index = this.texts.findIndex(text => text.key === key);
      if (index !== -1) {
        this.texts[index] = updatedText;
        this.alertService.showAlert('success', 'Texto actualizado', `Se ha actualizado el texto en ${lang.toUpperCase()}`);
      }
    }, () => {
      this.alertService.showAlert('error', 'Error', 'No se pudo actualizar el texto');
    });
  }

  /**
   * Eliminar un texto
   */
  deleteText(key: string) {
    if (!confirm(`¿Seguro que deseas eliminar el texto "${key}"?`)) return;

    this.textService.deleteText(key).subscribe(() => {
      this.texts = this.texts.filter(text => text.key !== key);
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
}