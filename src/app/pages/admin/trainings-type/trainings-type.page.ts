import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AlertConfirmService } from 'src/app/services/alert-confirm.service';
import { AlertService } from 'src/app/services/alert.service';
import { CategoriesService, Category } from 'src/app/services/categories.service';

@Component({
  selector: 'app-trainings-type',
  templateUrl: './trainings-type.page.html',
  styleUrls: ['./trainings-type.page.scss'],
  standalone: false
})
export class TrainingsTypePage implements OnInit {

  breadcrumbs = [
    { label: 'breadcrumbs.admin', navigate: '/admin', icon: 'settings-outline' },
    { label: 'breadcrumbs.trainings_type', navigate: '/admin/trainings-type', icon: 'barbell-outline' }
  ];

  addingTrainingType: boolean = false;
  editingTrainingType: boolean = false;

  TrainingTypes: Category[] = [];
  filteredTrainingTypes: Category[] = [];

  newTrainingType: Category = {
    _id: '',
    type: 'training_type',
    title: {
      ca: '',
      es: '',
      en: ''
    }, 
    description: {
      ca: '',
      es: '',
      en: ''
    }, 
    images: []
  };

  uploadedImagesFiles: File[] = [];
  uploadedImages: string[] = [];

  @ViewChild('fileInput') fileInput!: ElementRef;

  triggerFileInput() {
    this.fileInput.nativeElement.click();
  }

  constructor(
    private categoriesService: CategoriesService,
    private alertService: AlertService,
    private alertConfirmService: AlertConfirmService
  ) { }

  ngOnInit() {
    this.loadTrainingTypes();
  }

  /**
   * Cargar todos las àreas de competitción desde la API
   */
  loadTrainingTypes() {
    this.categoriesService.getCategoriesByType('training_type').subscribe(response => {
      this.TrainingTypes = response;
      this.filteredTrainingTypes = response;
    });
  }

  toggleAddTrainingType() {
    this.addingTrainingType = !this.addingTrainingType;
    if (!this.addingTrainingType) {
      this.resetForm();
    }
    if (this.editingTrainingType) {
      this.resetForm();
      this.editingTrainingType = !this.editingTrainingType;
    }
  }

  resetForm() {
    this.newTrainingType = {
      _id: '',
      type: 'training_type',
      title: {
        ca: '',
        es: '',
        en: ''
      }, 
      description: {
        ca: '',
        es: '',
        en: ''
      }, 
      images: []
    };
    this.uploadedImages = [];
    this.uploadedImagesFiles = [];
  }

  /**
   * Filtrar àreas de competición en la barra de búsqueda
   * @param event - Evento del ion-searchbar
   */
  filterTrainingTypes(event: any) {
    const searchTerm = event.target.value.toLowerCase();
    
    if (!searchTerm) {
      this.filteredTrainingTypes = this.TrainingTypes;
      return;
    }

    this.filteredTrainingTypes = this.TrainingTypes.filter(training_type => (
      training_type.title.ca.toLowerCase().includes(searchTerm) ||
      training_type.title.es.toLowerCase().includes(searchTerm) ||
      training_type.title.en.toLowerCase().includes(searchTerm)
    ));
  }

  toggleEditingTrainingType(training_type: Category) {
    if (this.addingTrainingType) {
      this.resetForm();
      this.addingTrainingType = !this.addingTrainingType;
    }
    this.newTrainingType = JSON.parse(JSON.stringify(training_type));
    this.uploadedImages = training_type.images;
    this.editingTrainingType = true;
  }

  onFileSelected(event: any) {
    const files = event.target.files as FileList;
    if (files && files.length) {
      this.uploadedImagesFiles = [];
  
      Array.from(files).forEach((file: File) => {
        this.uploadedImagesFiles.push(file);
      });

      this.uploadedImages = [];

      Array.from(files as FileList).forEach((file: File) => {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          this.uploadedImages.push(e.target.result);
        };
        reader.readAsDataURL(file);
      });
    }
  }

  saveTrainingType () {
    if (this.uploadedImagesFiles.length > 0) {
      const formData = new FormData();
      formData.append('category', JSON.stringify(this.newTrainingType));
      this.uploadedImagesFiles.forEach((file, index) => {
        formData.append(`files`, file);
      });
      this.categoriesService.postCategory(formData).subscribe({
        next: () => {
          this.loadTrainingTypes();
          this.alertService.showAlert('success', 'settings.trainings_type.added_title', 'settings.trainings_type.added_message');
          this.toggleAddTrainingType();
        },
        error: (error) => {
          this.alertService.showAlert('error', 'alerts.error_title', 'settings.trainings_type.error_message');
          this.toggleAddTrainingType();
        }
      });
    } else {
      this.alertService.showAlert('error', 'settings.competitions.images_required', 'settings.competitions.images_required_message');
    }
  }

  updateTrainingType () {
    const formData = new FormData();
    formData.append('category', JSON.stringify(this.newTrainingType));
    this.uploadedImagesFiles.forEach((file, index) => {
      formData.append(`files`, file);
    });
    this.categoriesService.updateCategory(this.newTrainingType._id, formData).subscribe({
      next: () => {
        this.loadTrainingTypes();
        this.alertService.showAlert('success', 'settings.trainings_type.updated', 'settings.trainings_type.updatedMessage');
        this.editingTrainingType = false;
      },
      error: (error) => {
        this.alertService.showAlert('error', 'alerts.error_title', 'settings.trainings_type.error_message');
        this.editingTrainingType = false;
      }
    });
  }

  async confirmDelete() {
    const confirmed = await this.alertConfirmService.showAlert('error', 'general.delete', 'settings.trainings_type.delete');
    if (confirmed) {
      this.deleteTrainingType();
    } 
  }

  deleteTrainingType () {
    this.categoriesService.deleteCategory(this.newTrainingType._id).subscribe(() => {
      this.loadTrainingTypes();
      this.alertService.showAlert('success', 'settings.trainings_type.deleted', 'settings.trainings_type.deletedMessage');
      this.editingTrainingType = false;
      this.resetForm();
    }, () => {
      this.alertService.showAlert('error', 'alerts.error_title', 'settings.trainings_type.error_delete');
      this.editingTrainingType = false;
      this.resetForm();
    });
  }

}
