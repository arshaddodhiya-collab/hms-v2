import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DischargeSummaryListComponent } from './discharge-summary-list.component';
import { DischargeSummaryService } from '../../services/discharge-summary.service';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { ButtonModule } from 'primeng/button';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';
import { Router } from '@angular/router';

describe('DischargeSummaryListComponent', () => {
  let component: DischargeSummaryListComponent;
  let fixture: ComponentFixture<DischargeSummaryListComponent>;
  let mockService: jasmine.SpyObj<DischargeSummaryService>;
  let mockRouter: jasmine.SpyObj<Router>;

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

    mockRouter = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      declarations: [DischargeSummaryListComponent],
      imports: [TableModule, TagModule, ButtonModule],
      providers: [
        { provide: DischargeSummaryService, useValue: mockService },
        { provide: Router, useValue: mockRouter },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DischargeSummaryListComponent);
    component = fixture.componentInstance;
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
    expect(mockRouter.navigate).toHaveBeenCalledWith([
      '/discharge-summary',
      '1',
    ]);
  });
});
