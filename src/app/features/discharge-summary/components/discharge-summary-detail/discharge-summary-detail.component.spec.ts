import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DischargeSummaryDetailComponent } from './discharge-summary-detail.component';
import { DischargeSummaryService } from '../../services/discharge-summary.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { TagModule } from 'primeng/tag';
import { of } from 'rxjs';

import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('DischargeSummaryDetailComponent', () => {
  let component: DischargeSummaryDetailComponent;
  let fixture: ComponentFixture<DischargeSummaryDetailComponent>;
  let mockService: jasmine.SpyObj<DischargeSummaryService>;
  let mockRouter: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    mockService = jasmine.createSpyObj('DischargeSummaryService', [
      'getDischargeSummaryById',
    ]);
    mockService.getDischargeSummaryById.and.returnValue(
      of({
        id: '1',
        patientName: 'Test Patient',
        patientId: 'P-TEST',
        doctorName: 'Dr. Test',
        admissionDate: new Date(),
        dischargeDate: new Date(),
        status: 'Discharged',
        diagnosis: 'Test Diagnosis',
        treatmentGiven: 'Test Treatment',
        prescribedMedicines: ['Meds'],
        followUpInstructions: 'Test Instructions',
      }),
    );

    mockRouter = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      declarations: [DischargeSummaryDetailComponent],
      imports: [
        CardModule,
        ButtonModule,
        DividerModule,
        TagModule,
        NoopAnimationsModule,
      ],
      providers: [
        { provide: DischargeSummaryService, useValue: mockService },
        { provide: Router, useValue: mockRouter },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: { paramMap: { get: () => '1' } },
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DischargeSummaryDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch summary details on init', () => {
    expect(mockService.getDischargeSummaryById).toHaveBeenCalledWith('1');
    expect(component.summary).toBeTruthy();
  });

  it('should navigate back on goBack', () => {
    component.goBack();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/discharge-summary']);
  });
});
