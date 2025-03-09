import { Component, OnInit } from '@angular/core';
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

  constructor(
    private imagesService: ImagesService
  ) { }

  ngOnInit() {
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
      // this.resetForm();
    }
  }

  saveImage() {
    if (this.newImageImage) {
      console.log(this.newImageKey);
      console.log(this.newImageImage);
      const formData = new FormData();
      formData.append('key', this.newImageKey);
      formData.append('image', this.newImageImage);
      console.log('Contenido de FormData:');
      formData.forEach((value, key) => {
        console.log(key, value);
      });
      this.imagesService.postImage(formData).subscribe({
        next: (response) => {
          console.log(response);
          /* this.texts.push(response);
          this.alertService.showAlert('success', 'settings.texts.text_added_title', 'settings.texts.text_added_message');
          this.toggleAddText(); */
        },
        error: (error) => {
          /* if (error.status === 400) {
              this.alertService.showAlert('error', 'alerts.duplicate_title', 'alerts.duplicate_message');
          } else {
              this.alertService.showAlert('error', 'alerts.error_title', 'settings.texts.error_message');
              this.toggleAddText();
          } */
         console.log(error);
        }
    });
    }
  }

  toggleEditingImage(image: Image) {}

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

}
