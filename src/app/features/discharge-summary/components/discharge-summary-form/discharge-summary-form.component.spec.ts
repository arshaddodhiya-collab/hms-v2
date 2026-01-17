import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DischargeSummaryFormComponent } from './discharge-summary-form.component';
import { DischargeSummaryService } from '../../services/discharge-summary.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { EditorModule } from 'primeng/editor';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { DividerModule } from 'primeng/divider';
import { of } from 'rxjs';

describe('DischargeSummaryFormComponent', () => {
  let component: DischargeSummaryFormComponent;
  let fixture: ComponentFixture<DischargeSummaryFormComponent>;
  let mockService: jasmine.SpyObj<DischargeSummaryService>;
  let mockRouter: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    mockService = jasmine.createSpyObj('DischargeSummaryService', [
      'getDischargeSummaryById',
      'createDischargeSummary',
      'updateDischargeSummary',
    ]);

    // Default mocks
    mockService.createDischargeSummary.and.returnValue(of({} as any));
    mockService.updateDischargeSummary.and.returnValue(of({} as any));
    mockService.getDischargeSummaryById.and.returnValue(of(undefined));

    mockRouter = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      declarations: [DischargeSummaryFormComponent],
      imports: [
        ReactiveFormsModule,
        FormsModule,
        CardModule,
        InputTextModule,
        ButtonModule,
        CalendarModule,
        DropdownModule,
        EditorModule,
        InputTextareaModule,
        DividerModule,
        NoopAnimationsModule,
      ],
      providers: [
        { provide: DischargeSummaryService, useValue: mockService },
        { provide: Router, useValue: mockRouter },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: { paramMap: { get: () => null } }, // Default to 'new' mode
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DischargeSummaryFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form with empty values in new mode', () => {
    expect(component.isEditMode).toBeFalse();
    expect(component.form.get('patientName')?.value).toBe('');
  });

  it('should validate required fields', () => {
    expect(component.form.valid).toBeFalse();
    component.form.controls['patientName'].setValue('Test Patient');
    // ... set other required fields ...
  });
});
