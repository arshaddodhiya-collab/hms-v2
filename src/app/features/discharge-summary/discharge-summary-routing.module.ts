import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DischargeSummaryListComponent } from './components/discharge-summary-list/discharge-summary-list.component';
import { DischargeSummaryDetailComponent } from './components/discharge-summary-detail/discharge-summary-detail.component';

const routes: Routes = [
  { path: '', component: DischargeSummaryListComponent },
  { path: ':id', component: DischargeSummaryDetailComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DischargeSummaryRoutingModule {}
