import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoundownComponentComponent } from './coundown-component.component';

describe('CoundownComponentComponent', () => {
  let component: CoundownComponentComponent;
  let fixture: ComponentFixture<CoundownComponentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CoundownComponentComponent]
    });
    fixture = TestBed.createComponent(CoundownComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
