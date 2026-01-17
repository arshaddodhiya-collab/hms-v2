import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DischargeSummaryListComponent } from './discharge-summary-list.component';
import { DischargeSummaryService } from '../../services/discharge-summary.service';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { ButtonModule } from 'primeng/button';
import { of } from 'rxjs';
import { Router } from '@angular/router';

import { MultiSelectModule } from 'primeng/multiselect';
import { CalendarModule } from 'primeng/calendar';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { RouterTestingModule } from '@angular/router/testing';

describe('DischargeSummaryListComponent', () => {
  let component: DischargeSummaryListComponent;
  let fixture: ComponentFixture<DischargeSummaryListComponent>;
  let mockService: jasmine.SpyObj<DischargeSummaryService>;
  let router: Router;

  beforeEach(async () => {
    mockService = jasmine.createSpyObj('DischargeSummaryService', [
      'getDischargeSummaries',
    ]);
    mockService.getDischargeSummaries.and.returnValue(
      of([
        {
          id: '1',
          patientName: 'Test Patient',
          patientId: 'P-TEST',
          doctorName: 'Dr. Test',
          admissionDate: new Date(),
          dischargeDate: new Date(),
          status: 'Discharged',
          diagnosis: 'Test Diagnosis',
          treatmentGiven: 'Test Treatment',
          prescribedMedicines: [],
          followUpInstructions: 'Test Instructions',
        },
      ]),
    );

    await TestBed.configureTestingModule({
      declarations: [DischargeSummaryListComponent],
      imports: [
        TableModule,
        TagModule,
        ButtonModule,
        MultiSelectModule,
        CalendarModule,
        InputTextModule,
        FormsModule,
        NoopAnimationsModule,
        RouterTestingModule,
      ],
      providers: [{ provide: DischargeSummaryService, useValue: mockService }],
    }).compileComponents();

    fixture = TestBed.createComponent(DischargeSummaryListComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    spyOn(router, 'navigate');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load summaries on init', () => {
    expect(mockService.getDischargeSummaries).toHaveBeenCalled();
    expect(component.summaries.length).toBe(1);
  });

  it('should navigate to details on view summary', () => {
    component.viewSummary('1');
    expect(router.navigate).toHaveBeenCalledWith(['/discharge-summary', '1']);
  });
});
