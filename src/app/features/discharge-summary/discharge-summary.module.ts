import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DischargeSummaryRoutingModule } from './discharge-summary-routing.module';
import { DischargeSummaryListComponent } from './components/discharge-summary-list/discharge-summary-list.component';
import { DischargeSummaryDetailComponent } from './components/discharge-summary-detail/discharge-summary-detail.component';

// PrimeNG Imports
import { TableModule } from 'primeng/table';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { TagModule } from 'primeng/tag';
import { InputTextModule } from 'primeng/inputtext';
import { TooltipModule } from 'primeng/tooltip';

@NgModule({
  declarations: [
    DischargeSummaryListComponent,
    DischargeSummaryDetailComponent,
  ],
  imports: [
    CommonModule,
    DischargeSummaryRoutingModule,
    TableModule,
    CardModule,
    ButtonModule,
    DividerModule,
    TagModule,
    InputTextModule,
    TooltipModule,
  ],
})
export class DischargeSummaryModule {}
