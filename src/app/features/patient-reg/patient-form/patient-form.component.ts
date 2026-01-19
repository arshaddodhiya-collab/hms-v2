import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  FormArray,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { PatientService } from '../services/patient.service';

// PrimeNG Modules
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { PanelModule } from 'primeng/panel';
import { RippleModule } from 'primeng/ripple';

@Component({
  selector: 'app-patient-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputTextModule,
    ButtonModule,
    CalendarModule,
    DropdownModule,
    InputTextareaModule,
    PanelModule,
    RippleModule,
  ],
  templateUrl: './patient-form.component.html',
  styleUrl: './patient-form.component.scss',
})
export class PatientFormComponent {
  patientForm: FormGroup;

  genderOptions = [
    { label: 'Male', value: 'Male' },
    { label: 'Female', value: 'Female' },
    { label: 'Other', value: 'Other' },
  ];

  maritalStatusOptions = [
    { label: 'Single', value: 'Single' },
    { label: 'Married', value: 'Married' },
    { label: 'Divorced', value: 'Divorced' },
    { label: 'Widowed', value: 'Widowed' },
  ];

  bloodGroupOptions = [
    { label: 'A+', value: 'A+' },
    { label: 'A-', value: 'A-' },
    { label: 'B+', value: 'B+' },
    { label: 'B-', value: 'B-' },
    { label: 'O+', value: 'O+' },
    { label: 'O-', value: 'O-' },
    { label: 'AB+', value: 'AB+' },
    { label: 'AB-', value: 'AB-' },
  ];

  nationalityOptions = [
    { label: 'United States', value: 'United States' },
    { label: 'India', value: 'India' },
    { label: 'United Kingdom', value: 'United Kingdom' },
    { label: 'Canada', value: 'Canada' },
    { label: 'Australia', value: 'Australia' },
    { label: 'Germany', value: 'Germany' },
    { label: 'France', value: 'France' },
    { label: 'China', value: 'China' },
    { label: 'Japan', value: 'Japan' },
    { label: 'Brazil', value: 'Brazil' },
  ];

  constructor(
    private fb: FormBuilder,
    private patientService: PatientService,
  ) {
    this.patientForm = this.fb.group({
      personalDetails: this.fb.group({
        firstName: [
          '',
          [Validators.required, Validators.pattern(/^[a-zA-Z\s]*$/)],
        ],
        lastName: [
          '',
          [Validators.required, Validators.pattern(/^[a-zA-Z\s]*$/)],
        ],
        dateOfBirth: ['', Validators.required],
        gender: ['', Validators.required],
        nationality: ['', Validators.required],
        maritalStatus: ['', Validators.required],
      }),
      contactInfo: this.fb.group({
        email: ['', [Validators.required, Validators.email]],
        phoneNumber: [
          '',
          [Validators.required, Validators.pattern(/^[0-9+\-\s]*$/)],
        ],
        address: this.fb.group({
          street: ['', Validators.required],
          city: ['', Validators.required],
          state: ['', Validators.required],
          postalCode: [
            '',
            [Validators.required, Validators.pattern(/^[0-9]*$/)],
          ],
          country: ['', Validators.required],
        }),
      }),
      medicalInfo: this.fb.group({
        bloodGroup: ['', Validators.required],
        allergies: this.fb.array([]),
        currentMedications: this.fb.array([]),
        pastSurgeries: this.fb.array([]),
      }),
      emergencyContacts: this.fb.array([]),
      insuranceInfo: this.fb.group({
        providerName: ['', Validators.required],
        policyNumber: ['', Validators.required],
        coverageDetails: ['', Validators.required],
        expirationDate: ['', Validators.required],
      }),
    });

    // Add initial empty fields for better UX
    this.addEmergencyContact();
  }

  // Helper methods for FormArrays
  get medicalInfo() {
    return this.patientForm.get('medicalInfo') as FormGroup;
  }

  get allergies() {
    return this.medicalInfo.get('allergies') as FormArray;
  }

  get currentMedications() {
    return this.medicalInfo.get('currentMedications') as FormArray;
  }

  get pastSurgeries() {
    return this.medicalInfo.get('pastSurgeries') as FormArray;
  }

  get emergencyContacts() {
    return this.patientForm.get('emergencyContacts') as FormArray;
  }

  // Methods to add/remove items
  addAllergy() {
    this.allergies.push(this.fb.control('', Validators.required));
  }

  removeAllergy(index: number) {
    this.allergies.removeAt(index);
  }

  addMedication() {
    this.currentMedications.push(this.fb.control('', Validators.required));
  }

  removeMedication(index: number) {
    this.currentMedications.removeAt(index);
  }

  addSurgery() {
    this.pastSurgeries.push(this.fb.control('', Validators.required));
  }

  removeSurgery(index: number) {
    this.pastSurgeries.removeAt(index);
  }

  addEmergencyContact() {
    this.emergencyContacts.push(
      this.fb.group({
        name: ['', [Validators.required, Validators.pattern(/^[a-zA-Z\s]*$/)]],
        relationship: ['', Validators.required],
        phoneNumber: [
          '',
          [Validators.required, Validators.pattern(/^[0-9+\-\s]*$/)],
        ],
      }),
    );
  }

  removeEmergencyContact(index: number) {
    this.emergencyContacts.removeAt(index);
  }

  onSubmit() {
    if (this.patientForm.valid) {
      this.patientService
        .submitRegistration(this.patientForm.value)
        .subscribe((response) => {
          console.log(response);
          alert('Patient Registered Successfully!');
          this.patientForm.reset();
        });
    } else {
      this.patientForm.markAllAsTouched();
    }
  }
}
