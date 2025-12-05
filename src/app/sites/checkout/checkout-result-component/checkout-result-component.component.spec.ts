import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckoutResultComponentComponent } from './checkout-result-component.component';

describe('CheckoutResultComponentComponent', () => {
  let component: CheckoutResultComponentComponent;
  let fixture: ComponentFixture<CheckoutResultComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CheckoutResultComponentComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CheckoutResultComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
