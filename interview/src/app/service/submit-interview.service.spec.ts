import { TestBed } from '@angular/core/testing';

import { SubmitInterviewService } from './submit-interview.service';

describe('SubmitInterviewService', () => {
  let service: SubmitInterviewService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SubmitInterviewService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
