import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-discharge-summary-form',
  templateUrl: './discharge-summary-form.component.html',
  styleUrls: ['./discharge-summary-form.component.scss'],
})
export class DischargeSummaryFormComponent implements OnInit {
  form!: FormGroup;
  isEditMode = false;

  statusOptions = [
    { label: 'Admitted', value: 'Admitted' },
    { label: 'Discharged', value: 'Discharged' },
  ];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.initForm();

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.loadSummary(id);
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

      // 🔑 IMPORTANT: must be empty string, NOT null
      treatmentGiven: [''],
      followUpInstructions: [''],

      prescribedMedicines: [''],
    });
  }

  private loadSummary(id: string): void {
    // 🔴 Replace this mock with API call
    const summaryFromApi = {
      patientName: 'John Doe',
      patientId: 'P-1001',
      doctorName: 'Dr. Smith',
      status: 'Discharged',
      admissionDate: new Date('2023-10-01'),
      dischargeDate: new Date('2023-10-10'),
      diagnosis: 'Acute Bronchitis',

      // ⚠️ Backend often sends null → sanitize it
      treatmentGiven: null,
      followUpInstructions: null,

      prescribedMedicines: 'Amoxicillin 500mg, Paracetamol 500mg',
    };

    this.form.patchValue({
      ...summaryFromApi,
      treatmentGiven: summaryFromApi.treatmentGiven || '',
      followUpInstructions: summaryFromApi.followUpInstructions || '',
    });
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const payload = {
      ...this.form.value,
      prescribedMedicines: this.form.value.prescribedMedicines
        ? this.form.value.prescribedMedicines
            .split(',')
            .map((m: string) => m.trim())
        : [],
    };

    console.log('Submitting Discharge Summary:', payload);

    // 🔴 Replace with API call
    this.router.navigate(['/discharge-summary']);
  }

  cancel(): void {
    this.router.navigate(['/discharge-summary']);
  }
}
