import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

export interface User extends Auth {
  _id: string;
  name: string;
  surname: string;
  email: string;
  role: 'admin' | 'user';
  telephone?: string;
  dateBorn?: Date;
  profileImage?: string;
  language: 'ca' | 'es' | 'en_US';
}

export interface Auth {
  username: string;
  password: string;
  validated: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = environment.apiUrl + '/users'; 

  constructor(private http: HttpClient) { }

  /**
   * Obtiene un usuario específico
   * @param id - ID de mongo
   */
  getUser(id: string): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/${id}`);
  }

  /**
   * Obtiene todos los usuarios disponibles
   */
  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl);
  }

  /**
   * Actualiza un usuario
   * @param id - ID de mongo
   * @param user - Usuario modificado
   */
  updateUser(id: string, user: User): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/${id}`, { user });
  }

  /**
   * Elimina un usuario
   * @param id - ID de mongo
   */
  deleteUser(id: string): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(`${this.apiUrl}/${id}`);
  }
}
