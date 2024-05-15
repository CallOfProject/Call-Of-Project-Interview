import {ComponentFixture, TestBed} from '@angular/core/testing';

import {TestInterviewComponent} from './test-interview.component';

describe('TestInterviewComponent', () => {
  let component: TestInterviewComponent;
  let fixture: ComponentFixture<TestInterviewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestInterviewComponent]
    });
    fixture = TestBed.createComponent(TestInterviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
