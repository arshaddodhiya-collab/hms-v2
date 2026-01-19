import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'discharge-summary',
    loadChildren: () =>
      import('./features/discharge-summary/discharge-summary.module').then(
        (m) => m.DischargeSummaryModule,
      ),
  },
  {
    path: '',
    redirectTo: 'discharge-summary',
    pathMatch: 'full',
  },
  {
    path: 'patient-reg',
    loadChildren: () =>
      import('./features/patient-reg/patient-reg.module').then(
        (m) => m.PatientRegModule,
      ),
  },
  {
    path: '',
    redirectTo: 'patient-reg',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
