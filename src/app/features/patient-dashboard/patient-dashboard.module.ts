import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';

import { Component } from '@angular/core';

@Component({
  selector: 'app-patient-dashboard',
  template: `
    <div class="p-4">
      <p-card header="Patient Portal" subheader="My Health Records">
        <p>
          Welcome to your patient portal. View your upcoming appointments and
          history.
        </p>
        <div class="flex gap-2 mt-4">
          <button pButton label="View History" icon="pi pi-history"></button>
          <button
            pButton
            label="Book Appointment"
            icon="pi pi-calendar-plus"
            class="p-button-outlined"
          ></button>
        </div>
      </p-card>
    </div>
  `,
})
export class PatientDashboardComponent {}

@NgModule({
  declarations: [PatientDashboardComponent],
  imports: [
    CommonModule,
    CardModule,
    ButtonModule,
    RouterModule.forChild([{ path: '', component: PatientDashboardComponent }]),
  ],
})
export class PatientDashboardModule {}
