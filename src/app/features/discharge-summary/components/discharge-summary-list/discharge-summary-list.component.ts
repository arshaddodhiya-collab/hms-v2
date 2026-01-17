import { Component, OnInit, inject } from '@angular/core';
import { DischargeSummaryService } from '../../services/discharge-summary.service';
import { DischargeSummary } from '../../models/discharge-summary.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-discharge-summary-list',
  templateUrl: './discharge-summary-list.component.html',
  styleUrls: ['./discharge-summary-list.component.scss'],
})
export class DischargeSummaryListComponent implements OnInit {
  summaries: DischargeSummary[] = [];
  doctors: { label: string; value: string }[] = [];

  private dischargeSummaryService = inject(DischargeSummaryService);
  private router = inject(Router);

  ngOnInit(): void {
    this.dischargeSummaryService
      .getDischargeSummaries()
      .subscribe((data: DischargeSummary[]) => {
        this.summaries = data;
        // Extract unique doctor names for filter
        const doctorNames = [
          ...new Set(data.map((item: DischargeSummary) => item.doctorName)),
        ];
        this.doctors = doctorNames.map((name: string) => ({
          label: name,
          value: name,
        }));
      });
  }

  viewSummary(id: string): void {
    this.router.navigate(['/discharge-summary', id]);
  }
}
