import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { PatientRegistration } from '../interfaces/patient.interfaces';

@Injectable({
  providedIn: 'root',
})
export class PatientService {
  constructor() {}

  submitRegistration(data: PatientRegistration): Observable<any> {
    console.log('Submitting patient registration data:', data);
    // Simulate HTTP request
    return of({
      success: true,
      message: 'Patient registered successfully!',
      data,
    }).pipe(delay(1000));
  }
}
