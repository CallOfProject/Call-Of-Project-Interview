import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Create_testInterviewComponent } from './create_test-interview.component';

describe('TestInterviewComponent', () => {
  let component: Create_testInterviewComponent;
  let fixture: ComponentFixture<Create_testInterviewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [Create_testInterviewComponent]
    });
    fixture = TestBed.createComponent(Create_testInterviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
