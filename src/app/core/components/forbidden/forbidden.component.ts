import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-forbidden',
  templateUrl: './forbidden.component.html',
})
export class ForbiddenComponent {
  constructor(
    private router: Router,
    private authService: AuthService,
  ) {}

  goHome() {
    this.router.navigate([this.authService.getRedirectUrl()]);
  }
}
    