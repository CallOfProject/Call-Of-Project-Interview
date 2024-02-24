import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCodingInterviewComponent } from './create-coding-interview.component';

describe('CreateCodingInterviewComponent', () => {
  let component: CreateCodingInterviewComponent;
  let fixture: ComponentFixture<CreateCodingInterviewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateCodingInterviewComponent]
    });
    fixture = TestBed.createComponent(CreateCodingInterviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
