import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DischargeSummaryService } from '../../services/discharge-summary.service';
import { DischargeSummary } from '../../models/discharge-summary.model';

@Component({
  selector: 'app-discharge-summary-form',
  templateUrl: './discharge-summary-form.component.html',
  styleUrls: ['./discharge-summary-form.component.scss'],
})
export class DischargeSummaryFormComponent implements OnInit {
  form!: FormGroup;
  isEditMode = false;
  summaryId: string | null = null;

  statusOptions = [
    { label: 'Admitted', value: 'Admitted' },
    { label: 'Discharged', value: 'Discharged' },
  ];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private dischargeSummaryService: DischargeSummaryService,
  ) {}

  ngOnInit(): void {
    this.initForm();

    this.summaryId = this.route.snapshot.paramMap.get('id');
    if (this.summaryId) {
      this.isEditMode = true;
      this.loadSummary(this.summaryId);
    }
  }

  private initForm(): void {
    this.form = this.fb.group({
      patientName: ['', Validators.required],
      patientId: ['', Validators.required],
      doctorName: ['', Validators.required],
      status: ['', Validators.required],
      admissionDate: [null, Validators.required],
      dischargeDate: [null, Validators.required],
      diagnosis: ['', Validators.required],
      treatmentGiven: [''],
      followUpInstructions: [''],
      prescribedMedicines: [''],
    });
  }

  private loadSummary(id: string): void {
    this.dischargeSummaryService
      .getDischargeSummaryById(id)
      .subscribe((data) => {
        if (data) {
          this.form.patchValue({
            ...data,
            prescribedMedicines: data.prescribedMedicines.join(', '),
            admissionDate: new Date(data.admissionDate),
            dischargeDate: new Date(data.dischargeDate),
            treatmentGiven: data.treatmentGiven || '',
            followUpInstructions: data.followUpInstructions || '',
          });
        }
      });
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const formValue = this.form.value;
    const summary: DischargeSummary = {
      id: this.summaryId || '',
      ...formValue,
      prescribedMedicines: formValue.prescribedMedicines
        ? formValue.prescribedMedicines.split(',').map((m: string) => m.trim())
        : [],
    };

    if (this.isEditMode) {
      this.dischargeSummaryService
        .updateDischargeSummary(summary)
        .subscribe(() => {
          this.router.navigate(['/discharge-summary', this.summaryId]);
        });
    } else {
      this.dischargeSummaryService
        .createDischargeSummary(summary)
        .subscribe(() => {
          this.router.navigate(['/discharge-summary']);
        });
    }
  }

  cancel(): void {
    this.router.navigate(['/discharge-summary']);
  }
}
