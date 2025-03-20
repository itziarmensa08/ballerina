import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AlertConfirmService } from 'src/app/services/alert-confirm.service';
import { AlertService } from 'src/app/services/alert.service';
import { Image, ImageAdd, ImagesService } from 'src/app/services/images.service';

@Component({
  selector: 'app-images',
  templateUrl: './images.page.html',
  styleUrls: ['./images.page.scss'],
  standalone: false,
})
export class ImagesPage implements OnInit {

  uploadedImageUrl: string | ArrayBuffer | null = null;

  breadcrumbs = [
    { label: 'Admin', navigate: '/admin', icon: 'settings-outline' },
    { label: 'Images', navigate: '/admin/images', icon: 'images-outline' }
  ];

  images: Image[] = [];
  filteredImages: Image[] = [];
  addingImage: boolean = false;
  editingImage: boolean = false;

  newImageKey: string = '';
  newImageImage: File | null = null;
  updatingImageId: String = '';

  @ViewChild('fileInput') fileInput!: ElementRef;

  triggerFileInput() {
    this.fileInput.nativeElement.click();
  }

  constructor(
    private imagesService: ImagesService,
    private alertService: AlertService,
    private alertConfirmService: AlertConfirmService
  ) { }

  ngOnInit() {
    this.loadImages();
  }

  /**
   * Cargar todos las imágenes desde la API
   */
  loadImages() {
    this.imagesService.getAllImages().subscribe(response => {
      this.images = response;
      this.filteredImages = response;
    });
  }

  /**
   * Filtrar imágenes en la barra de búsqueda
   * @param event - Evento del ion-searchbar
   */
  filterImages(event: any) {
    const searchTerm = event.target.value.toLowerCase();
    
    if (!searchTerm) {
      this.filteredImages = this.images;
      return;
    }

    this.filteredImages = this.images.filter(image => image.key.toLowerCase().includes(searchTerm));
  }

  toggleAddImage() {
    this.addingImage = !this.addingImage;
    if (!this.addingImage) {
      this.resetForm();
    }
    if (this.editingImage) {
      this.resetForm();
      this.editingImage = !this.editingImage;
    }
  }

  saveImage() {
    if (this.newImageImage) {
      const formData = new FormData();
      formData.append('key', this.newImageKey);
      formData.append('image', this.newImageImage);
      this.imagesService.postImage(formData).subscribe({
        next: () => {
          this.loadImages();
          this.alertService.showAlert('success', 'settings.images.added_title', 'settings.images.added_message');
          this.toggleAddImage();
        },
        error: (error) => {
          if (error.status === 400) {
            this.alertService.showAlert('error', 'alerts.duplicate_title', 'alerts.duplicate_message');
          } else {
            this.alertService.showAlert('error', 'alerts.error_title', 'settings.texts.error_message');
            this.toggleAddImage();
          }
        }
      });
    }
  }

  toggleEditingImage(image: Image) {
    this.uploadedImageUrl = image.image;
    this.updatingImageId = image._id;
    this.editingImage = true;
    if (this.addingImage) {
      this.resetForm();
      this.addingImage = !this.addingImage;
    }
  }

  onFileSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      this.newImageImage = file;
      const reader = new FileReader();
      reader.onload = () => {
        this.uploadedImageUrl = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }

  updateImage() {
    if (this.newImageImage) {
      const formData = new FormData();
      formData.append('image', this.newImageImage);
      this.imagesService.updateImage(this.updatingImageId, formData).subscribe(updatedImage => {
        this.loadImages();
        this.alertService.showAlert('success', 'settings.images.updated', 'settings.images.updatedMessage');
        this.editingImage = false;
        this.resetForm();
      }, () => {
        this.alertService.showAlert('error', 'alerts.error_title', 'settings.texts.error_update_text');
        this.editingImage = false;
        this.resetForm();
      });
    }
  }

  async confirmDelete() {
    const confirmed = await this.alertConfirmService.showAlert('error', 'general.delete', 'settings.images.delete');
    if (confirmed) {
      this.deleteImage();
    } 
  }

  deleteImage() {
    console.log(this.updatingImageId);
    this.imagesService.deleteImage(this.updatingImageId).subscribe(() => {
      this.loadImages();
      this.alertService.showAlert('success', 'settings.images.deleted', 'settings.images.deletedMessage');
      this.editingImage = false;
      this.resetForm();
    }, () => {
      this.alertService.showAlert('error', 'alerts.error_title', 'settings.images.error_delete_text');
      this.editingImage = false;
      this.resetForm();
    });
  }

  /**
   * Reiniciar el formulario de nuevo texto
   */
  resetForm() {
    this.newImageImage = null;
    this.newImageKey = '';
    this.uploadedImageUrl = '';
  }

}
