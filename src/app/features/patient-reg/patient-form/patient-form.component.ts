import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  FormArray,
  Validators,
  ReactiveFormsModule,
  FormControl,
} from '@angular/forms';
import { PatientService } from '../services/patient.service';
import { PatientValidators } from '../validators/patient.validators';

// PrimeNG Modules
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { PanelModule } from 'primeng/panel';
import { RippleModule } from 'primeng/ripple';
import { ChipModule } from 'primeng/chip';
import { InputMaskModule } from 'primeng/inputmask';
import { KeyFilterModule } from 'primeng/keyfilter';
import { InputSwitchModule } from 'primeng/inputswitch';

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
    ChipModule,
    InputMaskModule,
    KeyFilterModule,
    InputSwitchModule,
  ],
  templateUrl: './patient-form.component.html',
  styleUrl: './patient-form.component.scss',
})
export class PatientFormComponent {
  patientForm: FormGroup;
  inputValidation = signal(false);
  nameRegex = /[a-zA-Z\s]/; // Allow letters and spaces

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
          [Validators.required, PatientValidators.noSpecialChars],
        ],
        lastName: ['', [Validators.required, PatientValidators.noSpecialChars]],
        dateOfBirth: ['', [Validators.required, PatientValidators.pastDate]],
        gender: ['', Validators.required],
        nationality: ['', Validators.required],
        maritalStatus: ['', Validators.required],
      }),
      contactInfo: this.fb.group({
        email: ['', [Validators.required, Validators.email]],
        phoneNumber: [
          '',
          [Validators.required, PatientValidators.validPhoneNumber],
        ],
        address: this.fb.group({
          street: ['', Validators.required],
          city: ['', Validators.required],
          state: ['', Validators.required],
          postalCode: [
            '',
            [Validators.required, PatientValidators.numericOnly],
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
      hasInsurance: [false],
      insuranceInfo: this.fb.group({
        providerName: [''],
        policyNumber: [''],
        coverageDetails: [''],
        expirationDate: [''],
      }),
    });

    // Handle dynamic validation for insurance info
    this.patientForm
      .get('hasInsurance')
      ?.valueChanges.subscribe((hasInsurance) => {
        const insuranceGroup = this.patientForm.get(
          'insuranceInfo',
        ) as FormGroup;
        const controls = [
          'providerName',
          'policyNumber',
          'coverageDetails',
          'expirationDate',
        ];

        if (hasInsurance) {
          insuranceGroup
            .get('providerName')
            ?.setValidators(Validators.required);
          insuranceGroup
            .get('policyNumber')
            ?.setValidators(Validators.required);
          insuranceGroup
            .get('coverageDetails')
            ?.setValidators(Validators.required);
          insuranceGroup
            .get('expirationDate')
            ?.setValidators([
              Validators.required,
              PatientValidators.futureDate,
            ]);
        } else {
          controls.forEach((controlName) => {
            const control = insuranceGroup.get(controlName);
            control?.clearValidators();
            control?.reset(); // Clear values when disabled
          });
        }

        controls.forEach((controlName) => {
          insuranceGroup.get(controlName)?.updateValueAndValidity();
        });
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
        name: ['', [Validators.required, PatientValidators.noSpecialChars]],
        relationship: ['', Validators.required],
        phoneNumber: [
          '',
          [Validators.required, PatientValidators.validPhoneNumber],
        ],
      }),
    );
  }

  removeEmergencyContact(index: number) {
    this.emergencyContacts.removeAt(index);
  }

  submittedData: any = null;

  onSubmit() {
    if (this.patientForm.valid) {
      this.submittedData = this.patientForm.value;
      this.patientService
        .submitRegistration(this.patientForm.value)
        .subscribe((response) => {
          console.log(response);
          this.inputValidation.set(false);
          // Optional: Delay reset or keep form populated? User requirement implies showing data "below", usually means "result".
          // I will reset the form but keep the submittedData for display.
          this.patientForm.reset();
          // Scroll to bottom to show the data
          setTimeout(() => {
            document
              .querySelector('#submittedDataView')
              ?.scrollIntoView({ behavior: 'smooth' });
          }, 100);
          alert('Patient Registered Successfully!');
        });
    } else {
      this.markFormGroupDirty(this.patientForm, true);
    }
  }

  markFormGroupDirty(
    formGroup: FormGroup | null | undefined,
    scrollToInvalid?: boolean,
  ) {
    if (!formGroup) return;

    this.inputValidation.set(false);
    Object.keys(formGroup.controls).forEach((field) => {
      const control = formGroup.get(field);
      if (!control) return;

      if (control instanceof FormControl) {
        control.markAsDirty();
        control.markAsTouched(); // Ensure touched state for template errors
        if (control.invalid && !this.inputValidation() && scrollToInvalid) {
          const invalidControlElement = document.querySelector(
            `[formcontrolname="${field}"]`,
          );
          if (invalidControlElement) {
            invalidControlElement.scrollIntoView({
              behavior: 'smooth',
              block: 'center',
            });
            // Focus if it's an input
            if (
              invalidControlElement instanceof HTMLInputElement ||
              invalidControlElement instanceof HTMLTextAreaElement
            ) {
              invalidControlElement.focus();
            }
          }
          this.inputValidation.set(true);
        }
      } else if (control instanceof FormGroup) {
        this.markFormGroupDirty(control, scrollToInvalid);
      } else if (control instanceof FormArray) {
        control.controls.forEach((subFormGroup) =>
          this.markFormGroupDirty(subFormGroup as FormGroup, scrollToInvalid),
        );
      }
    });
  }
}
