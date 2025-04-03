import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = environment.apiUrl + '/auth'; 

  constructor(private http: HttpClient) {}

  /**
   * Registra un nuevo usuario
   * @param userData - Datos del usuario a registrar
   * @returns Observable con la respuesta del backend
   */
  register(userData: Partial<User>): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/register`, userData);
  }

  /**
   * Inicia sesión y obtiene los tokens
   * @param credentials - Datos de inicio de sesión { username, password }
   * @returns Observable con accessToken, refreshToken y datos del usuario
   */
  login(credentials: { username: string; password: string }): Observable<{ accessToken: string; refreshToken: string; user: User }> {
    return this.http.post<{ accessToken: string; refreshToken: string; user: User }>(
      `${this.apiUrl}/login`, 
      credentials
    );
  }

  /**
   * Refresca el token de acceso con un refreshToken válido
   * @param refreshToken - Token de actualización
   * @returns Observable con un nuevo accessToken
   */
  refreshToken(refreshToken: string): Observable<{ accessToken: string; refreshToken: string }> {
    return this.http.post<{ accessToken: string; refreshToken: string }>(`${this.apiUrl}/refresh`, { refreshToken });
  }

  /**
   * Valida un usuario usando el token de validación enviado por email
   * @param token - Token de validación
   * @returns Observable con la respuesta del backend
   */
  validateUser(token: string): Observable<{ message: string }> {
    return this.http.patch<{ message: string }>(`${this.apiUrl}/validate/${token}`, {});
  }

  /**
   * Obtiene el accessToken almacenado
   */
  getAccessToken(): string | null {
    return localStorage.getItem('accessToken') || sessionStorage.getItem('accessToken');
  }

  /**
   * Obtiene el refreshToken almacenado
   */
  getRefreshToken(): string | null {
    return localStorage.getItem('refreshToken') || sessionStorage.getItem('refreshToken');
  }

  /**
   * Guarda el accessToken y refreshToken
   */
  saveTokens(accessToken: string, refreshToken: string) {

    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');

    if (localStorage.getItem('rememberMe')) {
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);
    } else {
      sessionStorage.setItem('accessToken', accessToken);
      sessionStorage.setItem('refreshToken', refreshToken);
    }
    
  }

  /**
   * Elimina los tokens y cierra sesión
   */
  logout() {
    localStorage.clear();
    sessionStorage.clear();
    window.location.href = '/home'; // Redirigir al login
  }

  /**
   * Verifica si el usuario está logueado
   * @returns `true` si hay un accessToken almacenado, `false` si no
   */
  isLoggedIn(): boolean {
    return !!this.getAccessToken();
  }

  /**
   * Verifica si el usuario es administrador
   * @returns `true` si el usuario tiene rol "admin", `false` si no
   */
  isAdmin(): boolean {
    const user = JSON.parse(localStorage.getItem('user') || sessionStorage.getItem('user') || '{}');
    return user?.role === 'admin';
  }

}
