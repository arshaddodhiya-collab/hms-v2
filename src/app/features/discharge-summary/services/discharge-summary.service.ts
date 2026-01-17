import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { DischargeSummary } from '../models/discharge-summary.model';

@Injectable({
  providedIn: 'root',
})
export class DischargeSummaryService {
  private mockData: DischargeSummary[] = [
    {
      id: '1',
      patientName: 'John Doe',
      patientId: 'P-1001',
      doctorName: 'Dr. Smith',
      admissionDate: new Date('2023-10-01'),
      dischargeDate: new Date('2023-10-10'),
      status: 'Discharged',
      diagnosis: 'Acute Bronchitis',
      treatmentGiven: 'Antibiotics, Nebulization, Rest',
      prescribedMedicines: ['Amoxicillin 500mg', 'Paracetamol 500mg'],
      followUpInstructions: 'Review after 1 week. Drink plenty of water.',
    },
    {
      id: '2',
      patientName: 'Jane Smith',
      patientId: 'P-1002',
      doctorName: 'Dr. Johnson',
      admissionDate: new Date('2023-11-05'),
      dischargeDate: new Date('2023-11-12'),
      status: 'Discharged',
      diagnosis: 'Viral Fever',
      treatmentGiven: 'Antipyretics, IV Fluids',
      prescribedMedicines: ['Dolo 650mg', 'Zintac 150mg'],
      followUpInstructions: 'Monitor temperature. Visit ER if fever persists.',
    },
    {
      id: '3',
      patientName: 'Robert Brown',
      patientId: 'P-1003',
      doctorName: 'Dr. Williams',
      admissionDate: new Date('2023-12-01'),
      dischargeDate: new Date('2023-12-05'),
      status: 'Discharged',
      diagnosis: 'Food Poisoning',
      treatmentGiven: 'IV Fluids, Antiemetics',
      prescribedMedicines: ['Ondansetron 4mg', 'ORS'],
      followUpInstructions: 'Avoid outside food for 2 weeks.',
    },
  ];

  constructor() {}

  getDischargeSummaries(): Observable<DischargeSummary[]> {
    return of(this.mockData);
  }

  getDischargeSummaryById(
    id: string,
  ): Observable<DischargeSummary | undefined> {
    const summary = this.mockData.find((d) => d.id === id);
    return of(summary);
  }
}
