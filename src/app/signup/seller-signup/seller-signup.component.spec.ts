import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SellerSignupComponent } from './seller-signup.component';

describe('SellerSignupComponent', () => {
  let component: SellerSignupComponent;
  let fixture: ComponentFixture<SellerSignupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SellerSignupComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SellerSignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
