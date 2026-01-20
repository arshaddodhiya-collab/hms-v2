import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(
    private router: Router,
    private authService: AuthService,
  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler,
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        switch (error.status) {
          case 0:
            alert('No internet connection');
            break;

          case 401:
            this.authService.logout();
            this.router.navigate(['/login']);
            break;

          case 403:
            this.router.navigate(['/unauthorized']);
            break;

          case 404:
            this.router.navigate(['/notfound']);
            break;

          case 500:
            alert('Server error. Please try again later.');
            break;

          default:
            alert('Something went wrong');
        }

        return throwError(() => error);
      }),
    );
  }
}
