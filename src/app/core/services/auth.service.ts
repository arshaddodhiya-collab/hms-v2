import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { tap, delay } from 'rxjs/operators';
import { Router } from '@angular/router';

export interface User {
  username: string;
  role: string;
  token?: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor(private router: Router) {
    const token = localStorage.getItem('access_token');
    if (token) {
      const user = this.decodeToken(token);
      if (user) {
        this.currentUserSubject.next({ ...user, token });
      } else {
        this.logout(); // Invalid token
      }
    }
  }

  get currentUserValue(): User | null {
    return this.currentUserSubject.value;
  }

  get token(): string | null {
    return localStorage.getItem('access_token');
  }

  login(username: string, password: string): Observable<boolean> {
    // Mock validation
    // Username: doctor
    // Password: test
    if (username === 'doctor' && password === 'test') {
      const mockUser: User = {
        username: 'doctor',
        role: 'DOCTOR',
      };

      const token = this.generateMockJwt(mockUser);

      return of(true).pipe(
        delay(500), // Simulate network latency
        tap(() => {
          localStorage.setItem('access_token', token);
          this.currentUserSubject.next({ ...mockUser, token });
        }),
      );
    }
    return throwError(() => new Error('Invalid username or password'));
  }

  logout(): void {
    localStorage.removeItem('access_token');
    this.currentUserSubject.next(null);
    this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
    return !!this.token; // Check existence of token
  }

  hasRole(role: string): boolean {
    const user = this.currentUserSubject.value;
    return user ? user.role === role : false;
  }

  private generateMockJwt(user: User): string {
    const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
    const payload = btoa(
      JSON.stringify({
        sub: user.username,
        role: user.role,
        exp: Math.floor(Date.now() / 1000) + 60 * 60, // 1 hour expiration
      }),
    );
    const signature = 'mockSignature'; // In real app, this is signed by server secret
    return `${header}.${payload}.${signature}`;
  }

  private decodeToken(token: string): User | null {
    try {
      const parts = token.split('.');
      if (parts.length !== 3) return null;

      const payload = JSON.parse(atob(parts[1]));
      // Check expiration
      const now = Math.floor(Date.now() / 1000);
      if (payload.exp && payload.exp < now) {
        return null;
      }

      return {
        username: payload.sub,
        role: payload.role,
      };
    } catch (e) {
      return null;
    }
  }
}
