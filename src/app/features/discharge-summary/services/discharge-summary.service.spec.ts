import { TestBed } from '@angular/core/testing';
import { DischargeSummaryService } from './discharge-summary.service';

describe('DischargeSummaryService', () => {
  let service: DischargeSummaryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DischargeSummaryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return discharge summaries', (done) => {
    service.getDischargeSummaries().subscribe((summaries) => {
      expect(summaries.length).toBeGreaterThan(0);
      done();
    });
  });

  it('should return a single discharge summary by id', (done) => {
    service.getDischargeSummaryById('1').subscribe((summary) => {
      expect(summary).toBeTruthy();
      expect(summary?.id).toBe('1');
      done();
    });
  });
});
