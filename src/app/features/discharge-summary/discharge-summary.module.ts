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
import { EditorModule } from 'primeng/editor';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { MultiSelectModule } from 'primeng/multiselect';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { DischargeSummaryFormComponent } from './components/discharge-summary-form/discharge-summary-form.component';

@NgModule({
  declarations: [
    DischargeSummaryListComponent,
    DischargeSummaryDetailComponent,
    DischargeSummaryFormComponent,
  ],
  imports: [
    CommonModule,
    DischargeSummaryRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    TableModule,
    CardModule,
    ButtonModule,
    DividerModule,
    TagModule,
    InputTextModule,
    TooltipModule,
    EditorModule,
    CalendarModule,
    DropdownModule,
    MultiSelectModule,
    InputTextareaModule,
  ],
})
export class DischargeSummaryModule {}
