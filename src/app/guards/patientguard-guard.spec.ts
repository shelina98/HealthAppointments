import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { patientguardGuard } from './patientguard-guard';

describe('patientguardGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => patientguardGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
