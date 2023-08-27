import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LockmanagerComponent } from './lock-manager.component';

describe('LockmanagerComponent', () => {
  let component: LockmanagerComponent;
  let fixture: ComponentFixture<LockmanagerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LockmanagerComponent]
    });
    fixture = TestBed.createComponent(LockmanagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
