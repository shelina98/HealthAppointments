import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicalHistoryComponent } from './medical-history-component';

describe('MedicalHistoryComponent', () => {
  let component: MedicalHistoryComponent;
  let fixture: ComponentFixture<MedicalHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MedicalHistoryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MedicalHistoryComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
