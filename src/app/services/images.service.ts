import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

export interface Image {
  _id: string;
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
   * Crea una imágen nueva
   */
  postImage(form: FormData): Observable<Image> {
    return this.http.post<Image>(this.apiUrl, form);
  }

  /**
   * Modifica una imágen
   */
  updateImage(id: String, form: FormData): Observable<Image> {
    return this.http.put<Image>(`${this.apiUrl}/${id}`, form);
  }

  /**
   * Elimina una imágen
   */
  deleteImage(id: String): Observable<Image> {
    return this.http.delete<Image>(`${this.apiUrl}/${id}`);
  }

}
