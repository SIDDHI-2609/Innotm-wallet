import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentMoney } from './payment-money';

describe('PaymentMoney', () => {
  let component: PaymentMoney;
  let fixture: ComponentFixture<PaymentMoney>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaymentMoney]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaymentMoney);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
