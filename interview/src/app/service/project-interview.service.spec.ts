import {TestBed} from '@angular/core/testing';

import {ProjectInterviewService} from './project-interview.service';

describe('ProjectInterviewService', () => {
  let service: ProjectInterviewService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProjectInterviewService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
