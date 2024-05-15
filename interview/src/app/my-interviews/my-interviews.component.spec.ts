import {ComponentFixture, TestBed} from '@angular/core/testing';

import {MyInterviewsComponent} from './my-interviews.component';

describe('MyInterviewsComponent', () => {
  let component: MyInterviewsComponent;
  let fixture: ComponentFixture<MyInterviewsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MyInterviewsComponent]
    });
    fixture = TestBed.createComponent(MyInterviewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
