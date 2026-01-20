import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

interface MenuItem {
  label: string;
  icon: string;
  routerLink: string;
  role?: string;
}

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
export class MainLayoutComponent implements OnInit {
  mobileMenuActive = false;
  menuItems: MenuItem[] = [];
  currentUserRole: string = '';

  constructor(private authService: AuthService) {}

  ngOnInit() {
    const user = this.authService.currentUserValue;
    this.currentUserRole = user?.role || '';
    this.updateMenu();
  }

  updateMenu() {
    const role = this.currentUserRole;
    this.menuItems = [];

    if (role === 'DOCTOR') {
      this.menuItems.push(
        {
          label: 'Discharge Summary',
          icon: 'pi pi-file',
          routerLink: '/discharge-summary',
        },
        {
          label: 'Patient Reg',
          icon: 'pi pi-user-plus',
          routerLink: '/patient-reg',
        },
      );
    } else if (role === 'ADMIN') {
      this.menuItems.push(
        {
          label: 'Admin Dashboard',
          icon: 'pi pi-cog',
          routerLink: '/admin-dashboard',
        },
        // Admin might have access to everything? For now just their dash.
      );
    } else if (role === 'PATIENT') {
      this.menuItems.push({
        label: 'My Dashboard',
        icon: 'pi pi-home',
        routerLink: '/patient-dashboard',
      });
    }
  }

  toggleMobileMenu() {
    this.mobileMenuActive = !this.mobileMenuActive;
  }

  logout() {
    this.authService.logout();
  }

  // Helper for template to check role if needed directly
  hasRole(role: string): boolean {
    return this.currentUserRole === role;
  }
}
