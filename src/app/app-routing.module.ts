import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { MainLayoutComponent } from './core/components/main-layout/main-layout.component';

import { ForbiddenComponent } from './core/components/forbidden/forbidden.component';
import { NotFoundComponent } from './core/components/not-found/not-found.component';

const routes: Routes = [
  {
    path: 'unauthorized',
    component: ForbiddenComponent,
  },
  {
    path: 'notfound',
    component: NotFoundComponent,
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./features/login/login.module').then((m) => m.LoginModule),
  },
  {
    path: '',
    component: MainLayoutComponent,
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    children: [
      {
        path: 'discharge-summary',
        data: { role: 'DOCTOR' },
        loadChildren: () =>
          import('./features/discharge-summary/discharge-summary.module').then(
            (m) => m.DischargeSummaryModule,
          ),
      },
      {
        path: 'patient-reg',
        data: { role: 'DOCTOR' },
        loadChildren: () =>
          import('./features/patient-reg/patient-reg.module').then(
            (m) => m.PatientRegModule,
          ),
      },
      {
        path: 'admin-dashboard',
        data: { role: 'ADMIN' },
        loadChildren: () =>
          import('./features/admin-dashboard/admin-dashboard.module').then(
            (m) => m.AdminDashboardModule,
          ),
      },
      {
        path: 'patient-dashboard',
        data: { role: 'PATIENT' },
        loadChildren: () =>
          import('./features/patient-dashboard/patient-dashboard.module').then(
            (m) => m.PatientDashboardModule,
          ),
      },
      {
        path: '',
        redirectTo: 'discharge-summary',
        pathMatch: 'full', // This should be handled by AuthGuard redirect actually, or removed?
        // Defaulting to discharge-summary is fine for now, but better would be a "dashboard" resolver or simple redirects.
        // For now leaving as is, since redirects are handled on login.
      },
    ],
  },
  {
    path: '**',
    redirectTo: 'login', // Catch all redirect to login
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
