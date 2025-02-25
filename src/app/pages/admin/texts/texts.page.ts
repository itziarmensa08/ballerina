import { Component, OnInit } from '@angular/core';
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

  constructor(private textService: TextService) { }

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
      alert('Todos los campos son obligatorios');
      return;
    }

    this.textService.createText(this.newText).subscribe(response => {
      this.texts.push(response); // Agregar el nuevo texto a la lista
      this.toggleAddText(); // Cerrar el formulario
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
      }
    });
  }

  /**
   * Eliminar un texto
   */
  deleteText(key: string) {
    if (!confirm(`¿Seguro que deseas eliminar el texto "${key}"?`)) return;

    this.textService.deleteText(key).subscribe(() => {
      this.texts = this.texts.filter(text => text.key !== key);
    });
  }

  /**
   * Reiniciar el formulario de nuevo texto
   */
  resetForm() {
    this.newText = { key: '', value: { ca: '', es: '', en_US: '' } };
  }
}