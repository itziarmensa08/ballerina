import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AlertConfirmService } from 'src/app/services/alert-confirm.service';
import { AlertService } from 'src/app/services/alert.service';
import { CategoriesService, Category } from 'src/app/services/categories.service';

@Component({
  selector: 'app-exhibitions',
  templateUrl: './exhibitions.page.html',
  styleUrls: ['./exhibitions.page.scss'],
  standalone: false,
})
export class ExhibitionsPage implements OnInit {

  breadcrumbs = [
    { label: 'breadcrumbs.admin', navigate: '/admin', icon: 'settings-outline' },
    { label: 'breadcrumbs.exhibitions', navigate: '/admin/exhibitions', icon: 'trophy-outline' }
  ];

  addingExhibition: boolean = false;
  editingExhibition: boolean = false;

  exhibitions: Category[] = [];
  filteredExhibitions: Category[] = [];

  newExhibition: Category = {
    _id: '',
    type: 'exhibition',
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
    images: [],
    videos: []
  };

  uploadedImagesFiles: File[] = [];
  uploadedImages: string[] = [];

  uploadedVideosFiles: File[] = [];
  uploadedVideos: string[] = [];

  @ViewChild('fileInput') fileInput!: ElementRef;
  @ViewChild('videoInput') videoInput!: ElementRef<HTMLInputElement>;

  constructor(
    private categoriesService: CategoriesService,
    private alertService: AlertService,
    private alertConfirmService: AlertConfirmService
  ) { }

  ngOnInit() {
    this.loadExhibitions();
  }

  /**
   * Cargar todos las competiciones desde la API
   */
  loadExhibitions() {
    this.categoriesService.getCategoriesByType('exhibition').subscribe(response => {
      this.exhibitions = response;
      this.filteredExhibitions = response;
    });
  }

  toggleAddExhibition() {
    this.addingExhibition = !this.addingExhibition;
    if (!this.addingExhibition) {
      this.resetForm();
    }
    if (this.editingExhibition) {
      this.resetForm();
      this.editingExhibition = !this.editingExhibition;
    }
  }

  resetForm () {
    this.newExhibition = {
      _id: '',
      type: 'exhibition',
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
      images: [],
      videos: []
    };
    this.uploadedImages = [];
    this.uploadedImagesFiles = [];
    this.uploadedVideos = [];
    this.uploadedVideosFiles = [];
  }

  filterExhibitions (event: any) {
    const searchTerm = event.target.value.toLowerCase();
    
    if (!searchTerm) {
      this.filteredExhibitions = this.exhibitions;
      return;
    }

    this.filteredExhibitions = this.exhibitions.filter(exhibition => (
      exhibition.title.ca.toLowerCase().includes(searchTerm) ||
      exhibition.title.es.toLowerCase().includes(searchTerm) ||
      exhibition.title.en.toLowerCase().includes(searchTerm)
    ));
  }

  toggleEditingExhibition(exhibition: Category) {
    if (this.addingExhibition) {
      this.resetForm();
      this.addingExhibition = !this.addingExhibition;
    }
    this.newExhibition = JSON.parse(JSON.stringify(exhibition));
    this.uploadedImages = exhibition.images;
    this.uploadedVideos = exhibition.videos ?? [];
    this.editingExhibition = true;
  }

  triggerFileInput() {
    this.fileInput.nativeElement.click();
  }

  triggerVideoInput() {
    this.videoInput.nativeElement.click();
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

  onVideoSelected(event: any) {
    const files = event.target.files as FileList;
    if (files && files.length) {
      this.uploadedVideosFiles = [];
  
      Array.from(files).forEach((file: File) => {
        this.uploadedVideosFiles.push(file);
      });

      this.uploadedVideos = [];

      Array.from(files as FileList).forEach((file: File) => {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          this.uploadedVideos.push(e.target.result);
        };
        reader.readAsDataURL(file);
      });
    }
  }

  saveExhibition () {
    if (this.uploadedImagesFiles.length > 0) {
      const formData = new FormData();
      formData.append('category', JSON.stringify(this.newExhibition));
      this.uploadedImagesFiles.forEach((file, index) => {
        formData.append(`files`, file);
      });
      this.uploadedVideosFiles.forEach((file, index) => {
        formData.append(`files`, file);
      });
      this.categoriesService.postCategory(formData).subscribe({
        next: () => {
          this.loadExhibitions();
          this.alertService.showAlert('success', 'settings.exhibitions.added_title', 'settings.exhibitions.added_message');
          this.toggleAddExhibition();
        },
        error: (error) => {
          this.alertService.showAlert('error', 'alerts.error_title', 'settings.exhibitions.error_message');
          this.toggleAddExhibition();
        }
      });
    } else {
      this.alertService.showAlert('error', 'settings.competitions.images_required', 'settings.competitions.images_required_message');
    }
  }

  updateExhibition () {
    const formData = new FormData();
    formData.append('category', JSON.stringify(this.newExhibition));
    this.uploadedImagesFiles.forEach((file, index) => {
      formData.append(`files`, file);
    });
    this.uploadedVideosFiles.forEach((file, index) => {
      formData.append(`files`, file);
    });
    this.categoriesService.updateCategory(this.newExhibition._id, formData).subscribe({
      next: () => {
        this.loadExhibitions();
        this.alertService.showAlert('success', 'settings.exhibitions.updated', 'settings.exhibitions.updatedMessage');
        this.editingExhibition = false;
      },
      error: (error) => {
        this.alertService.showAlert('error', 'alerts.error_title', 'settings.exhibitions.error_message');
        this.editingExhibition = false;
      }
    });
  }

  async confirmDelete() {
    const confirmed = await this.alertConfirmService.showAlert('error', 'general.delete', 'settings.exhibitions.delete');
    if (confirmed) {
      this.deleteExhibition();
    } 
  }

  deleteExhibition() {
    this.categoriesService.deleteCategory(this.newExhibition._id).subscribe(() => {
      this.loadExhibitions();
      this.alertService.showAlert('success', 'settings.exhibitions.deleted', 'settings.exhibitions.deletedMessage');
      this.editingExhibition = false;
      this.resetForm();
    }, () => {
      this.alertService.showAlert('error', 'alerts.error_title', 'settings.exhibitions.error_delete');
      this.editingExhibition = false;
      this.resetForm();
    });
  }

}
