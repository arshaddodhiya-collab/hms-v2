import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { tap, delay } from 'rxjs/operators';
import { Router } from '@angular/router';

export interface User {
  username: string;
  role: 'DOCTOR' | 'ADMIN' | 'PATIENT';
  token?: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  private readonly MOCK_USERS: Record<string, User & { password: string }> = {
    doctor: { username: 'doctor', password: 'test', role: 'DOCTOR' },
    admin: { username: 'admin', password: 'admin', role: 'ADMIN' },
    patient: { username: 'patient', password: 'patient', role: 'PATIENT' },
  };

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
    const user = this.MOCK_USERS[username];

    if (user && user.password === password) {
      // Create a user object without password for the state/token
      const { password: _, ...userInfo } = user;
      const token = this.generateMockJwt(userInfo);

      return of(true).pipe(
        delay(500),
        tap(() => {
          localStorage.setItem('access_token', token);
          this.currentUserSubject.next({ ...userInfo, token });
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
    return !!this.token;
  }

  hasRole(role: string): boolean {
    const user = this.currentUserSubject.value;
    return user ? user.role === role : false;
  }

  // Helper to determine where to redirect after login based on role
  getRedirectUrl(): string {
    const role = this.currentUserValue?.role;
    switch (role) {
      case 'ADMIN':
        return '/admin-dashboard';
      case 'PATIENT':
        return '/patient-dashboard';
      case 'DOCTOR':
        return '/discharge-summary';
      default:
        return '/';
    }
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
    const signature = 'mockSignature';
    return `${header}.${payload}.${signature}`;
  }

  private decodeToken(token: string): User | null {
    try {
      const parts = token.split('.');
      if (parts.length !== 3) return null;

      const payload = JSON.parse(atob(parts[1]));
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
