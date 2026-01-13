import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderStrip } from './order-strip';

describe('OrderStrip', () => {
  let component: OrderStrip;
  let fixture: ComponentFixture<OrderStrip>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrderStrip]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrderStrip);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
