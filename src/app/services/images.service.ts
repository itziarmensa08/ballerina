import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

export interface Image {
  key: string;
  images: string[];
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
}
