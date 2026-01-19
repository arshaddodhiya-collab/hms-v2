import { AbstractControl, ValidationErrors } from '@angular/forms';

export class PatientValidators {
  static noSpecialChars(control: AbstractControl): ValidationErrors | null {
    if (!control.value) return null;
    const regex = /^[a-zA-Z\s]*$/;
    return regex.test(control.value) ? null : { invalidName: true };
  }

  static validPhoneNumber(control: AbstractControl): ValidationErrors | null {
    if (!control.value) return null;
    const regex = /^[0-9+\-\s]*$/;
    return regex.test(control.value) ? null : { invalidPhone: true };
  }

  static numericOnly(control: AbstractControl): ValidationErrors | null {
    if (!control.value) return null;
    const regex = /^[0-9]*$/;
    return regex.test(control.value) ? null : { numericOnly: true };
  }

  static pastDate(control: AbstractControl): ValidationErrors | null {
    if (!control.value) return null;
    const inputDate = new Date(control.value);
    const today = new Date();
    return inputDate < today ? null : { futureDate: true };
  }

  static futureDate(control: AbstractControl): ValidationErrors | null {
    if (!control.value) return null;
    const inputDate = new Date(control.value);
    const today = new Date();
    // Reset time part for accurate comparison
    today.setHours(0, 0, 0, 0);
    return inputDate > today ? null : { pastDate: true };
  }
}
