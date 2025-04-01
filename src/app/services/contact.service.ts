import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  private apiUrl = environment.apiUrl + '/contact'; 

  constructor(private http: HttpClient) {}

  /**
   * Envia un email de contacto
   * @param name - Nombre del usuario
   * @param email - Email del usuario
   * @param subject - Asunto
   * @param message - Mensaje
   */
  sendContact(name: string, email: string, subject: string, message: string): Observable<Text> {
    return this.http.post<Text>(this.apiUrl, { name, email, subject, message });
  }
}
