import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WotForm } from './wot-form';

describe('WotForm', () => {
  let component: WotForm;
  let fixture: ComponentFixture<WotForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WotForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WotForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
