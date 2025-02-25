import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

export interface TextValue {
  ca: string;
  es: string;
  en_US: string;
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
   * @param lang - Idioma ('ca', 'es', 'en_US')
   */
  getText(key: string, lang: string): Observable<{ value: string }> {
    return this.http.get<{ value: string }>(`${this.apiUrl}/texts/${key}/${lang}`);
  }

  /**
   * Actualiza un texto en un idioma específico
   * @param key - Clave del texto
   * @param lang - Idioma a actualizar ('ca', 'es', 'en_US')
   * @param value - Nuevo valor del texto
   */
  updateText(key: string, lang: string, value: string): Observable<Text> {
    return this.http.put<Text>(`${this.apiUrl}/texts`, { key, lang, value });
  }

  /**
   * Obtiene todos los textos disponibles
   */
  getAllTexts(): Observable<Text[]> {
    return this.http.get<Text[]>(`${this.apiUrl}/texts`);
  }
}