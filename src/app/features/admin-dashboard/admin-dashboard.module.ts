import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CardModule } from 'primeng/card';

import { Component } from '@angular/core';

@Component({
  selector: 'app-admin-dashboard',
  template: `
    <div class="p-4">
      <p-card header="Admin Dashboard" subheader="System Overview">
        <p>Welcome, Admin. Manage system users and settings here.</p>
        <div class="grid mt-4">
          <div class="col-12 md:col-6 lg:col-3">
            <div class="surface-card shadow-2 p-3 border-round">
              <div class="flex justify-content-between mb-3">
                <div>
                  <span class="block text-500 font-medium mb-3"
                    >Total Users</span
                  >
                  <div class="text-900 font-medium text-xl">152</div>
                </div>
                <div
                  class="flex align-items-center justify-content-center bg-blue-100 border-round"
                  style="width:2.5rem;height:2.5rem"
                >
                  <i class="pi pi-users text-blue-500 text-xl"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </p-card>
    </div>
  `,
})
export class AdminDashboardComponent {}

@NgModule({
  declarations: [AdminDashboardComponent],
  imports: [
    CommonModule,
    CardModule,
    RouterModule.forChild([{ path: '', component: AdminDashboardComponent }]),
  ],
})
export class AdminDashboardModule {}
