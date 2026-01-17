import { Component, OnInit } from '@angular/core';
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

  constructor(
    private dischargeSummaryService: DischargeSummaryService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.dischargeSummaryService.getDischargeSummaries().subscribe((data) => {
      this.summaries = data;
    });
  }

  viewSummary(id: string): void {
    this.router.navigate(['/discharge-summary', id]);
  }
}
