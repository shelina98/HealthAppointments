import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicalHistoryDialogComponent } from './medical-history-dialog-component';

describe('MedicalHistoryDialogComponent', () => {
  let component: MedicalHistoryDialogComponent;
  let fixture: ComponentFixture<MedicalHistoryDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MedicalHistoryDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MedicalHistoryDialogComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
