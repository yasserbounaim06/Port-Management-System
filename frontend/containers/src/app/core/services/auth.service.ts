import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

export interface User {
  id: number;
  username: string;
  email: string;
  role: 'admin' | 'manager' | 'personnel';
  is_active: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface LoginRequest {
  role: string;
  password: string;
}

export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
  role: 'admin' | 'manager' | 'personnel';
}

export interface AuthResponse {
  message: string;
  token: string;
  user: User;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://127.0.0.1:5000/api/auth';
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient) {
    // Check if user is already logged in
    this.loadUserFromStorage();
  }

  private loadUserFromStorage(): void {
    const token = this.getToken();
    const user = this.getStoredUser();
    if (token && user) {
      this.currentUserSubject.next(user);
    }
  }

  login(credentials: LoginRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/login`, credentials)
      .pipe(
        map(response => {
          if (response.token && response.user) {
            localStorage.setItem('token', response.token);
            localStorage.setItem('user', JSON.stringify(response.user));
            this.currentUserSubject.next(response.user);
          }
          return response;
        }),
        catchError(error => {
          console.error('Login error:', error);
          return throwError(() => error);
        })
      );
  }

  register(userData: RegisterRequest): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, userData)
      .pipe(
        catchError(error => {
          console.error('Registration error:', error);
          return throwError(() => error);
        })
      );
  }

  logout(): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.post(`${this.apiUrl}/logout`, {}, { headers })
      .pipe(
        map(() => {
          this.clearAuthData();
          return { message: 'Logout successful' };
        }),
        catchError(error => {
          // Even if the server request fails, clear local data
          this.clearAuthData();
          return throwError(() => error);
        })
      );
  }

  getCurrentUser(): Observable<{ user: User }> {
    const headers = this.getAuthHeaders();
    return this.http.get<{ user: User }>(`${this.apiUrl}/me`, { headers })
      .pipe(
        map(response => {
          if (response.user) {
            localStorage.setItem('user', JSON.stringify(response.user));
            this.currentUserSubject.next(response.user);
          }
          return response;
        }),
        catchError(error => {
          if (error.status === 401) {
            this.clearAuthData();
          }
          return throwError(() => error);
        })
      );
  }

  private clearAuthData(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.currentUserSubject.next(null);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  private getStoredUser(): User | null {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  }

  isAuthenticated(): boolean {
    const token = this.getToken();
    const user = this.getStoredUser();
    // Basic check: token and user must exist and token must not be empty
    return !!(token && token !== 'undefined' && user);
  }

  getCurrentUserValue(): User | null {
    return this.currentUserSubject.value;
  }

  hasRole(role: string): boolean {
    const user = this.getCurrentUserValue();
    return user?.role === role;
  }

  hasPermission(resource: string): boolean {
    const user = this.getCurrentUserValue();
    if (!user) return false;

    const permissions: { [key: string]: string[] } = {
      'admin': ['containers', 'operations', 'personnel', 'shifts', 'navires', 'engins', 'arrets', 'missions', 'occupations'],
      'manager': ['operations', 'personnel', 'shifts', 'navires', 'engins', 'missions', 'occupations'],
      'personnel': ['containers']
    };

    return permissions[user.role]?.includes(resource) || false;
  }

  getAuthHeaders(): HttpHeaders {
    const token = this.getToken();
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  }

  // Helper method to check if user can access dashboard sections
  canAccessSection(section: string): boolean {
    return this.hasPermission(section);
  }

  // Get user's accessible sections for dashboard
  getAccessibleSections(): string[] {
    const user = this.getCurrentUserValue();
    if (!user) return [];

    const permissions: { [key: string]: string[] } = {
      'admin': ['containers', 'operations', 'personnel', 'shifts', 'navires', 'engins', 'arrets', 'missions', 'occupations'],
      'manager': ['operations', 'personnel', 'shifts', 'navires', 'engins', 'missions', 'occupations'],
      'personnel': ['containers']
    };

    return permissions[user.role] || [];
  }
}