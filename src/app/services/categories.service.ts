import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

export interface Category {
  _id: string,
  type: string,
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
  videos?: string[];
}

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  private apiUrl = environment.apiUrl + '/categories'; 

  constructor(private http: HttpClient) { }

  /**
   * Obtiene todas las categorías disponibles
   */
  getAllCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.apiUrl);
  }

  /**
   * Obtiene todas las categorías disponibles con un tipo
   */
  getCategoriesByType(type: string): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.apiUrl}/type/${type}`);
  }

  /**
   * Crea una categoría nueva
   */
  postCategory(form: FormData): Observable<Category> {
    return this.http.post<Category>(this.apiUrl, form);
  }

  /**
   * Modifica una categoría
   */
  updateCategory(id: String, form: FormData): Observable<Category> {
    return this.http.put<Category>(`${this.apiUrl}/${id}`, form);
  }

  /**
   * Elimina una categoría
   */
  deleteCategory(id: String): Observable<Category> {
    return this.http.delete<Category>(`${this.apiUrl}/${id}`);
  }
}
