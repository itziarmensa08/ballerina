import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

export interface ParentInfo {
  name: string;
  surname: string;
  telephone?: string;
}

export interface BancInfo {
  iban: string;
  titularity: string;
}

export interface Schedule {
  day: WeekDay;
  startTime: string;
  endTime: string;
}

export interface ImageRights {
  authorizing_tutor: {
      name: string;
      dni: string
  };
  authorized: boolean;
}

export type Role = 'admin' | 'user' | 'gimnast';
export type Level = 'base' | 'escolar' | 'federat';
export type Language = 'ca' | 'es' | 'en_US';
export type WeekDay = 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday';

export interface Auth {
  username: string;
  password: string;
  validated: boolean;
}

export interface User extends Auth {
  name: string;
  surname: string;
  email: string;
  role: Role;
  telephone?: string;
  dni?: string;
  catSalut?: string;
  dateBorn?: Date;
  profileImage?: string;
  address?: string;
  illness?: string;
  level?: Level;
  schedule?: Schedule[];
  parents?: ParentInfo[];
  imageRights?: ImageRights;
  language: Language;
  bancInfo?: BancInfo; 
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
