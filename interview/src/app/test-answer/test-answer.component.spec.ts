import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestAnswerComponent } from './test-answer.component';

describe('TestAnswerComponent', () => {
  let component: TestAnswerComponent;
  let fixture: ComponentFixture<TestAnswerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestAnswerComponent]
    });
    fixture = TestBed.createComponent(TestAnswerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
