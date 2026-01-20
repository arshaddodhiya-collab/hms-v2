import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styles: [
    `
      :host {
        display: block;
      }
      .layout-sidebar {
        z-index: 1000;
      }
      @media screen and (max-width: 768px) {
        .layout-sidebar {
          transform: translateX(-100%);
        }
        .layout-sidebar.active {
          transform: translateX(0);
        }
      }
    `,
  ],
})
export class MainLayoutComponent {
  mobileMenuActive = false;

  constructor(private authService: AuthService) {}

  toggleMobileMenu() {
    this.mobileMenuActive = !this.mobileMenuActive;
  }

  logout() {
    this.authService.logout();
  }
}
