import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CodingInterviewAnswerComponent } from './coding-interview-answer.component';

describe('CodingInterviewAnswerComponent', () => {
  let component: CodingInterviewAnswerComponent;
  let fixture: ComponentFixture<CodingInterviewAnswerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CodingInterviewAnswerComponent]
    });
    fixture = TestBed.createComponent(CodingInterviewAnswerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
