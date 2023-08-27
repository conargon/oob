import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LockDialogComponent } from './lock-dialog.component';

describe('LockDialogComponent', () => {
  let component: LockDialogComponent;
  let fixture: ComponentFixture<LockDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LockDialogComponent]
    });
    fixture = TestBed.createComponent(LockDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
