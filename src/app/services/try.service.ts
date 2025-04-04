import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TryService {

  private apiUrl = environment.apiUrl + '/try'; 

  constructor(private http: HttpClient) {}

  /**
   * Envia un email de prueba
   * @param name - Nombre del usuario
   * @param email - Email del usuario
   * @param age - Edat del usuario
   * @param doneRyth - Ha hecho rítmica?
   * @param message - Mensaje
   */
  sendTryMessage(name: string, email: string, age: string, doneRyth: string, message: string): Observable<Text> {
    return this.http.post<Text>(this.apiUrl, { name, email, age, doneRyth, message });
  }
}
