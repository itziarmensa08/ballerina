import { Component, OnInit } from '@angular/core';
import { Image, ImageAdd, ImagesService } from 'src/app/services/images.service';

@Component({
  selector: 'app-images',
  templateUrl: './images.page.html',
  styleUrls: ['./images.page.scss'],
  standalone: false,
})
export class ImagesPage implements OnInit {

  uploadedImageUrl: string | null = null;

  breadcrumbs = [
    { label: 'Admin', navigate: '/admin', icon: 'settings-outline' },
    { label: 'Images', navigate: '/admin/images', icon: 'images-outline' }
  ];

  images: Image[] = [];
  filteredImages: Image[] = [];
  addingImage: boolean = false;
  editingImage: boolean = false;

  newImageKey: string = '';

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

  saveImage() {}

  toggleEditingImage(image: Image) {}

  async uploadFromFile(event: any) {
    this.uploadedImageUrl = await this.imagesService.onFileSelected(this.newImageKey, event);
  }

}
