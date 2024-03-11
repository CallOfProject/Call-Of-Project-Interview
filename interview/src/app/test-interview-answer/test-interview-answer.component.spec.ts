import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestInterviewAnswerComponent } from './test-interview-answer.component';

describe('TestInterviewAnswerComponent', () => {
  let component: TestInterviewAnswerComponent;
  let fixture: ComponentFixture<TestInterviewAnswerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestInterviewAnswerComponent]
    });
    fixture = TestBed.createComponent(TestInterviewAnswerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
