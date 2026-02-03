import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocScheduleComponent } from './doc-schedule-component';

describe('DocScheduleComponent', () => {
  let component: DocScheduleComponent;
  let fixture: ComponentFixture<DocScheduleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DocScheduleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DocScheduleComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
