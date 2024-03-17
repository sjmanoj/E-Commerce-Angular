import { TestBed } from '@angular/core/testing';

import { CustomerSignupService } from './customer-signup.service';

describe('CustomerSignupService', () => {
  let service: CustomerSignupService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustomerSignupService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
