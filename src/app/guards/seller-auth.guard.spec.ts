import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { sellerAuthGuard } from './seller-auth.guard';

describe('sellerAuthGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => sellerAuthGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
