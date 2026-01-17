import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DischargeSummaryService } from '../../services/discharge-summary.service';
import { DischargeSummary } from '../../models/discharge-summary.model';

@Component({
  selector: 'app-discharge-summary-detail',
  templateUrl: './discharge-summary-detail.component.html',
  styleUrls: ['./discharge-summary-detail.component.scss'],
})
export class DischargeSummaryDetailComponent implements OnInit {
  summary: DischargeSummary | undefined;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dischargeSummaryService: DischargeSummaryService,
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.dischargeSummaryService
        .getDischargeSummaryById(id)
        .subscribe((data) => {
          this.summary = data;
        });
    }
  }

  goBack(): void {
    this.router.navigate(['/discharge-summary']);
  }

  print(): void {
    window.print();
  }
}
