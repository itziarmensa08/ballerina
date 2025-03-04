import { Component, OnInit } from '@angular/core';
import { Image, ImagesService } from 'src/app/services/images.service';

@Component({
  selector: 'app-images',
  templateUrl: './images.page.html',
  styleUrls: ['./images.page.scss'],
  standalone: false,
})
export class ImagesPage implements OnInit {

  breadcrumbs = [
    { label: 'Admin', navigate: '/admin', icon: 'settings-outline' },
    { label: 'Images', navigate: '/admin/images', icon: 'create-outline' }
  ];

  images: Image[] = [];
  filteredImages: Image[] = [];

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

  toggleAddImage() {}

  toggleEditingImage(image: Image) {}

}
