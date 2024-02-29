import { TestBed } from '@angular/core/testing';

import { CodeRunService } from './code-run.service';

describe('CodeRunService', () => {
  let service: CodeRunService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CodeRunService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
