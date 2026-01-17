import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DischargeSummaryService } from '../../services/discharge-summary.service';
import { DischargeSummary } from '../../models/discharge-summary.model';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-discharge-summary-detail',
  templateUrl: './discharge-summary-detail.component.html',
  styleUrls: ['./discharge-summary-detail.component.scss'],
})
export class DischargeSummaryDetailComponent implements OnInit {
  summary: DischargeSummary | undefined;
  isGeneratingPdf = false;
  today = new Date();

  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private dischargeSummaryService = inject(DischargeSummaryService);

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

  editSummary(): void {
    if (this.summary) {
      this.router.navigate(['/discharge-summary', this.summary.id, 'edit']);
    }
  }

  print(): void {
    window.print();
  }

  downloadPDF(): void {
    const element = document.getElementById('pdf-report');
    if (!element) return;

    this.isGeneratingPdf = true;

    // 'scale' works but TS might complain depending on version, casting options to any simplifies compatibility
    html2canvas(element, {
      scale: 3,
      useCORS: true,
      backgroundColor: '#ffffff',
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } as any)
      .then((canvas) => {
        const imgData = canvas.toDataURL('image/png');

        const pdf = new jsPDF('p', 'mm', 'a4');
        const pageWidth = 210;
        const pageHeight = 297;

        const imgWidth = pageWidth;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;

        let position = 0;
        let heightLeft = imgHeight;

        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;

        while (heightLeft > 0) {
          position -= pageHeight;
          pdf.addPage();
          pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
          heightLeft -= pageHeight;
        }

        pdf.save(
          `Discharge_Summary_${this.summary?.patientId || 'Report'}.pdf`,
        );
        this.isGeneratingPdf = false;
      })
      .catch((err) => {
        console.error('PDF Generation Error:', err);
        this.isGeneratingPdf = false;
      });
  }
}
