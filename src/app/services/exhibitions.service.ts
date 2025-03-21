import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

export interface Exhibition {
  _id: String,
  title: {
    ca: string,
    es: string,
    en: string
  };
  description: {
    ca: string,
    es: string,
    en: string
  };
  images: string[];
  videos: string[];
}

@Injectable({
  providedIn: 'root'
})
export class ExhibitionsService {
  private apiUrl = environment.apiUrl + '/exhibitions'; 

  constructor(private http: HttpClient) { }

  /**
   * Obtiene todas las competiciones disponibles
   */
  getAllExhibitions(): Observable<Exhibition[]> {
    return this.http.get<Exhibition[]>(this.apiUrl);
  }

  /**
   * Crea una competición nueva
   */
  postExhibition(form: FormData): Observable<Exhibition> {
    return this.http.post<Exhibition>(this.apiUrl, form);
  }

  /**
   * Modifica una competición
   */
  updateExhibition(id: String, form: FormData): Observable<Exhibition> {
    return this.http.put<Exhibition>(`${this.apiUrl}/${id}`, form);
  }

  /**
   * Elimina una competición
   */
  deleteExhibition(id: String): Observable<Exhibition> {
    return this.http.delete<Exhibition>(`${this.apiUrl}/${id}`);
  }
}
