import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

export interface TextValue {
  ca: string;
  es: string;
  en: string;
}

export interface Text {
  key: string;
  value: TextValue;
}

@Injectable({
  providedIn: 'root'
})
export class TextService {

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  /**
   * Obtiene un texto específico en el idioma seleccionado
   * @param key - Clave del texto
   * @param lang - Idioma ('ca', 'es', 'en')
   */
  getText(key: string, lang: string): Observable<{ value: string }> {
    return this.http.get<{ value: string }>(`${this.apiUrl}/texts/${key}/${lang}`);
  }

  /**
   * Obtiene todos los textos disponibles
   */
  getAllTexts(): Observable<Text[]> {
    return this.http.get<Text[]>(`${this.apiUrl}/texts`);
  }

  /**
   * Crea un nuevo texto
   * @param text - Objeto con la clave y valores en cada idioma
   */
  createText(text: Text): Observable<Text> {
    return this.http.post<Text>(`${this.apiUrl}/texts`, text);
  }

  /**
   * Actualiza un texto en un idioma específico
   * @param key - Clave del texto
   * @param value - Nuevo valor del texto
   */
  updateText(key: string, value: Text): Observable<Text> {
    return this.http.put<Text>(`${this.apiUrl}/texts`, { key, value });
  }

  /**
   * Elimina un texto por su clave
   * @param key - Clave del texto a eliminar
   */
  deleteText(key: string): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(`${this.apiUrl}/texts/${key}`);
  }
}
