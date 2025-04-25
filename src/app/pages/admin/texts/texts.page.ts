import { Component, OnInit } from '@angular/core';
import { AlertConfirmService } from 'src/app/services/alert-confirm.service';
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
    { label: 'breadcrumbs.admin', navigate: '/admin', icon: 'settings-outline' },
    { label: 'breadcrumbs.texts', navigate: '/admin/texts', icon: 'create-outline' }
  ];

  texts: Text[] = [];
  filteredTexts: Text[] = [];
  addingText: boolean = false;
  editingText: boolean = false;

  newText: Text = {
    key: '',
    value: { ca: '', es: '', en: '' }
  };

  constructor(
    private textService: TextService,
    private alertService: AlertService,
    private alertConfirmService: AlertConfirmService
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
      this.filteredTexts = response;
    });
  }

  /**
   * Filtrar textos en la barra de búsqueda
   * @param event - Evento del ion-searchbar
   */
  filterTexts(event: any) {
    const searchTerm = event.target.value.toLowerCase();

    if (!searchTerm) {
      this.filteredTexts = this.texts;
      return;
    }

    this.filteredTexts = this.texts.filter(text => text.key.toLowerCase().includes(searchTerm));
  }

  /**
   * Alternar la vista para añadir un nuevo texto
   */
  toggleAddText() {
    this.addingText = !this.addingText;
    if (!this.addingText) {
      this.resetForm();
    }

    if (this.editingText) {
      this.resetForm();
      this.editingText = !this.editingText;
    }
  }

  toggleEditingText(text: Text) {
    this.newText = JSON.parse(JSON.stringify(text));
    this.editingText = true;
    if (this.addingText) {
      this.resetForm();
      this.addingText = !this.addingText;
    }
  }

  /**
   * Crear un nuevo texto
   */
  saveText() {
    if (!this.newText.key || !this.newText.value.ca || !this.newText.value.es || !this.newText.value.en) {
        this.alertService.showAlert('warning', 'alerts.required_title', 'alerts.required_message');
        return;
    }

    this.textService.createText(this.newText).subscribe({
        next: () => {
          this.loadTexts();
          this.alertService.showAlert('success', 'settings.texts.text_added_title', 'settings.texts.text_added_message');
          this.toggleAddText();
        },
        error: (error) => {
          if (error.status === 400) {
              this.alertService.showAlert('error', 'alerts.duplicate_title', 'alerts.duplicate_message');
          } else {
              this.alertService.showAlert('error', 'alerts.error_title', 'settings.texts.error_message');
              this.toggleAddText();
          }
        }
    });
  }

  /**
   * Actualizar un texto existente en un idioma específico
   */
  updateText() {
    this.textService.updateText(this.newText.key, this.newText).subscribe(updatedText => {
      this.loadTexts();
      this.alertService.showAlert('success', 'settings.texts.updated', 'settings.texts.updatedMessage');
      this.editingText = false;
      this.resetForm();
    }, () => {
      this.alertService.showAlert('error', 'alerts.error_title', 'settings.texts.error_update_text');
      this.editingText = false;
      this.resetForm();
    });
  }

  /**
   * Eliminar un texto
   */
  deleteText() {
    this.textService.deleteText(this.newText.key).subscribe(() => {
      this.loadTexts();
      this.alertService.showAlert('success', 'settings.texts.deleted', 'settings.texts.deletedMessage');
      this.editingText = false;
      this.resetForm();
    }, () => {
      this.alertService.showAlert('error', 'alerts.error_title', 'settings.texts.error_delete_text');
      this.editingText = false;
      this.resetForm();
    });
  }

  /**
   * Reiniciar el formulario de nuevo texto
   */
  resetForm() {
    this.newText = { key: '', value: { ca: '', es: '', en: '' } };
  }

  async confirmDelete() {
    const confirmed = await this.alertConfirmService.showAlert('error', 'general.delete', 'settings.texts.delete');
    if (confirmed) {
      this.deleteText();
    }
  }
}
