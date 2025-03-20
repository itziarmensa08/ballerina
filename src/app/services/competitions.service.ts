import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

export interface Competition {
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
}

@Injectable({
  providedIn: 'root'
})

export class CompetitionsService {

  private apiUrl = environment.apiUrl + '/competitions'; 

  constructor(private http: HttpClient) { }

  /**
   * Obtiene todas las competiciones disponibles
   */
  getAllCompetitions(): Observable<Competition[]> {
    return this.http.get<Competition[]>(this.apiUrl);
  }

  /**
   * Crea una competición nueva
   */
  postCompetition(form: FormData): Observable<Competition> {
    return this.http.post<Competition>(this.apiUrl, form);
  }

  /**
   * Modifica una competición
   */
  updateCompetition(id: String, form: FormData): Observable<Competition> {
    return this.http.put<Competition>(`${this.apiUrl}/${id}`, form);
  }

  /**
   * Elimina una competición
   */
  deleteCompetition(id: String): Observable<Competition> {
    return this.http.delete<Competition>(`${this.apiUrl}/${id}`);
  }
}
