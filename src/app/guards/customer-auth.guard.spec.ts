import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { customerAuthGuard } from './customer-auth.guard';

describe('customerAuthGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => customerAuthGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
