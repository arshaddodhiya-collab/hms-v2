export interface DischargeSummary {
  id: string;
  patientName: string;
  patientId: string;
  doctorName: string;
  admissionDate: Date;
  dischargeDate: Date;
  status: 'Discharged' | 'Admitted'; // Added Admitted for completeness, though requirements say Discharged
  diagnosis: string;
  treatmentGiven: string;
  prescribedMedicines: string[];
  followUpInstructions: string;
}
