import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

export interface Image {
  key: string;
  image: string;
}

export interface ImageAdd {
  key: string;
  image: File;
}

@Injectable({
  providedIn: 'root'
})
export class ImagesService {

  private apiUrl = environment.apiUrl + '/images'; 

  constructor(private http: HttpClient) { }

  /**
   * Obtiene todas las imagenes disponibles
   */
  getAllImages(): Observable<Image[]> {
    return this.http.get<Image[]>(this.apiUrl);
  }

  /**
   * Selecciona una imagen desde la galería y la sube al backend
   */
  async selectImageFromGallery(key: string): Promise<string | null> {
    try {
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.Uri,
        source: CameraSource.Photos, // 📌 SOLO PERMITE SELECCIÓN DESDE GALERÍA
      });

      if (image.webPath) {
        return this.uploadImage(key, image.webPath); // 📌 Retorna la URL de Cloudinary
      }
      return null;
    } catch (error) {
      console.error("Error seleccionando imagen:", error);
      return null;
    }
  }

  /**
   * Selecciona una imagen desde el explorador de archivos
   */
  async onFileSelected(key: string, event: any): Promise<string | null> {
    const file: File = event.target.files[0];
    if (file) {
      const imageAdd : ImageAdd = {key: key, image: file};
      return this.uploadImageFile(imageAdd);
    }
    return null;
  }

  /**
   * Convierte una URI en un archivo y la sube al backend
   */
  private async uploadImage(key: string, imageUri: string): Promise<string | null> {
    const file = await this.getFileFromUri(imageUri);
    const imageAdd : ImageAdd = {key: key, image: file};
    return this.uploadImageFile(imageAdd);
  }

  /**
   * Convierte una URI en un File
   */
  private async getFileFromUri(uri: string): Promise<File> {
    const response = await fetch(uri);
    const blob = await response.blob();
    return new File([blob], "image.jpg", { type: "image/jpeg" });
  }

  /**
   * Sube un archivo al backend usando HttpClient y retorna la URL de Cloudinary
   */
  uploadImageFile(image: ImageAdd): Promise<string | null> {

    return new Promise((resolve, reject) => {
      this.http.post<{ images: string }>(this.apiUrl, image).subscribe({
        next: (data) => {
          console.log("Imagen subida con éxito:", data);
          resolve(data.images[0]); // 📌 Retorna la URL de Cloudinary
        },
        error: (error) => {
          console.error("Error al subir la imagen:", error);
          reject(null);
        },
      });
    });
  }
}
