import {ComponentFixture, TestBed} from '@angular/core/testing';

import {SidebarOperationsComponent} from './sidebar-operations.component';

describe('SidebarOperationsComponent', () => {
  let component: SidebarOperationsComponent;
  let fixture: ComponentFixture<SidebarOperationsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SidebarOperationsComponent]
    });
    fixture = TestBed.createComponent(SidebarOperationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
