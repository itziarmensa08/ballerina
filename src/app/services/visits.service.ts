import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

/**
 * Interface para una visita diaria
 */
export interface Visit {
  _id?: string;
  date: string;   // formato YYYY-MM-DD
  count: number;  // número total de visitas ese día
}

@Injectable({
  providedIn: 'root'
})
export class VisitService {

  private apiUrl = environment.apiUrl + '/visits';

  constructor(private http: HttpClient) {}

  /**
   * Registra una visita (incrementa el contador diario)
   */
  registerVisit(): Observable<{ message: string }> {
    return this.http.post<{ message: string }>(this.apiUrl, {});
  }

  /**
   * Obtiene todas las visitas registradas
   */
  getVisits(): Observable<Visit[]> {
    return this.http.get<Visit[]>(this.apiUrl);
  }

  /**
   * Obtiene las visitas de los últimos N días (si luego agregas ese endpoint)
   */
  getVisitsLastDays(days: number): Observable<Visit[]> {
    return this.http.get<Visit[]>(`${this.apiUrl}?days=${days}`);
  }
}
