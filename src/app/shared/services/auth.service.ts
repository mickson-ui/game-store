import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { isPlatformBrowser } from '@angular/common';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { User, AuthResponse } from '../models/user.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly API_BASE_URL = 'http://localhost:5032/api/v1'; // Replace with your API base URL
  private readonly CURRENT_USER_KEY = 'game_store_current_user';
  private readonly TOKEN_KEY = 'game_store_token';

  private currentUserSubject = new BehaviorSubject<User | null>(null);
  private tokenSubject = new BehaviorSubject<string | null>(null);
  private isBrowser: boolean;

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
    // localStorage.clear();
    if (this.isBrowser) {
      this.loadStoredAuth();
    }
  }

  /**
   * Load stored authentication data from localStorage.
   */
  private loadStoredAuth(): void {
    if (!this.isBrowser) return;

    const storedUser = localStorage.getItem(this.CURRENT_USER_KEY);
    const storedToken = localStorage.getItem(this.TOKEN_KEY);

    console.log('Stored User:', storedUser); // Debugging
    console.log('Stored Token:', storedToken); // Debugging

    if (storedUser && storedToken) {
      this.currentUserSubject.next(JSON.parse(storedUser));
      this.tokenSubject.next(storedToken);
    } else {
      this.currentUserSubject.next(null);
      this.tokenSubject.next(null);
    }
  }


  /**
   * Register a new user.
   */
  register(userData: User): Observable<AuthResponse> {
    const apiUrl = `${this.API_BASE_URL}/auth/register`;
    return this.http.post<AuthResponse>(apiUrl, userData).pipe(
      catchError((error) => this.handleError(error))
    );
  }

  /**
   * Log in a user and store their authentication data.
   */
  login(credentials: { email: string; password: string }): Observable<AuthResponse> {
    const apiUrl = `${this.API_BASE_URL}/auth/login`;
    return this.http.post<AuthResponse>(apiUrl, credentials).pipe(
      tap((response) => {
        if (response.isSuccessful && response.tokenDto?.token) {
          console.log('Login Successful:', response); // Debugging
          this.saveAuthData(response.user, response.tokenDto.token);
        }
      }),
      catchError((error) => this.handleError(error))
    );
  }


  /**
   * Save authentication data to localStorage.
   */
  private saveAuthData(user: User, token: string): void {
    if (this.isBrowser) {
      localStorage.setItem(this.CURRENT_USER_KEY, JSON.stringify(user));
      localStorage.setItem(this.TOKEN_KEY, token);
      this.currentUserSubject.next(user);
      this.tokenSubject.next(token);
    }
  }

  /**
   * Log out the user.
   */
  logout(): void {
    if (!this.isBrowser) return;

    const apiUrl = `${this.API_BASE_URL}/auth/logout`;
    const token = this.getTokenValue();

    if (token) {
      const headers = { Authorization: `Bearer ${token}` };
      this.http.post(apiUrl, {}, { headers }).subscribe({
        next: () => this.clearAuthData(),
        error: () => this.clearAuthData(),
      });
    } else {
      this.clearAuthData();
    }
  }

  /**
   * Clear authentication data from localStorage and subjects.
   */
  private clearAuthData(): void {
    if (!this.isBrowser) return;

    localStorage.removeItem(this.CURRENT_USER_KEY);
    localStorage.removeItem(this.TOKEN_KEY);
    this.currentUserSubject.next(null);
    this.tokenSubject.next(null);
  }

  /**
   * Check if the user is authenticated.
   */
  isAuthenticated(): boolean {
    const token = this.getTokenValue();
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        const currentTime = Math.floor(Date.now() / 1000);
        console.log('Token Payload:', payload); // Debugging
        return payload.exp > currentTime; // Check if token is still valid
      } catch (error) {
        console.error('Error parsing token:', error);
        return false;
      }
    }
    console.warn('No token found.');
    return false;
  }


  /**
   * Get the current user as an Observable.
   */
  getCurrentUser(): Observable<User | null> {
    return this.currentUserSubject.asObservable();
  }

  /**
   * Get the raw token value.
   */
  private getTokenValue(): string | null {
    return this.tokenSubject.getValue();
  }

  /**
   * Handle errors from API calls.
   */
  private handleError(error: any): Observable<never> {
    const errorMessage = error.error?.message || 'An unexpected error occurred';
    return throwError(() => new Error(errorMessage));
  }
}
