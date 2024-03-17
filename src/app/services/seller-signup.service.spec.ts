import { TestBed } from '@angular/core/testing';

import { SellerSignupService } from './seller-signup.service';

describe('SellerSignupService', () => {
  let service: SellerSignupService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SellerSignupService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
