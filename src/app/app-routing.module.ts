import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { MainLayoutComponent } from './core/components/main-layout/main-layout.component';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () =>
      import('./features/login/login.module').then((m) => m.LoginModule),
  },
  {
    path: '',
    component: MainLayoutComponent,
    canActivate: [AuthGuard],
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
        path: '',
        redirectTo: 'discharge-summary',
        pathMatch: 'full',
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
