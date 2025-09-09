import { Component, OnInit } from '@angular/core';
import { CartService, Cart } from '../../services/cart.service';
import { Observable } from 'rxjs';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
  FormControl,
  AbstractControl,
  ValidatorFn,
  ValidationErrors,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

type PaymentMethod = 'paypal' | 'sofort' | 'applepay' | 'card';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss', // ok
})
export class CheckoutComponent implements OnInit {
  cart$!: Observable<Cart>;
  step: 1 | 2 = 1;

  shippingCost = 4.99;
  
  paymentControl = new FormControl<PaymentMethod>('paypal', {
    nonNullable: true,
  });
  consentControl = new FormControl<boolean>(true, { nonNullable: true });

  addressForm!: FormGroup;
  cardForm!: FormGroup;

  processing = false;

  constructor(
    private cartService: CartService,
    private router: Router,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.cart$ = this.cartService.cart$;

    this.addressForm = this.fb.group({
      personal: this.fb.group({
        firstName: ['', [Validators.required, Validators.minLength(2)]],
        lastName: ['', [Validators.required, Validators.minLength(2)]],
        email: ['', [Validators.required, Validators.email]],
      }),
      location: this.fb.group({
        street: ['', [Validators.required, Validators.minLength(3)]],
        zip: ['', [Validators.required, Validators.pattern(/^\d{5}$/)]],
        city: ['', [Validators.required, Validators.minLength(2)]],
      }),
    });

    this.cardForm = this.fb.group({
      number: [
        '',
        [
          Validators.required,
          Validators.minLength(12),
          Validators.maxLength(22),
          digitsAndSpacesOnly(),
          luhnValidator(),
        ],
      ],
      expiry: ['', [Validators.required, expiryValidator()]],
      cvc: ['', [Validators.required, Validators.pattern(/^\d{3}$/)]],
      remember: [false],
    });
  }

  invalid(ctrlPath: string): boolean {
    const ctrl = this.addressForm.get(ctrlPath);
    return !!ctrl && ctrl.invalid && (ctrl.dirty || ctrl.touched);
  }

  cardInvalid(path: keyof CheckoutComponent['cardForm']['value']): boolean {
    const c = this.cardForm.get(path as string);
    return !!c && c.invalid && (c.dirty || c.touched);
  }

  nextStep() {
    this.step = 2;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  prevStep() {
    this.step = 1;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  submitAddress() {
    if (this.addressForm.invalid) {
      this.addressForm.markAllAsTouched();
      return;
    }
    this.nextStep();
  }

  payWithPaypal() {
    /* start PayPal flow */
  }
  payWithSofort() {
    /* start Sofort/Klarna flow */
  }
  payWithApplePay() {
    /* start Apple Pay session */
  }

  formatCardNumber(e: Event) {
    const el = e.target as HTMLInputElement;
    const digits = el.value.replace(/\D/g, '').slice(0, 19);
    el.value = digits.replace(/(\d{4})(?=\d)/g, '$1 ').trim();
    this.cardForm.get('number')!.setValue(el.value, { emitEvent: false });
  }

  formatExpiry(e: Event) {
    const el = e.target as HTMLInputElement;
    const digits = el.value.replace(/\D/g, '').slice(0, 4);
    const mm = digits.slice(0, 2);
    const yy = digits.slice(2, 4);
    el.value = yy ? `${mm}/${yy}` : mm;
    this.cardForm.get('expiry')!.setValue(el.value, { emitEvent: false });
  }

  async payWithCard() {
    if (this.cardForm.invalid) {
      this.cardForm.markAllAsTouched();
      return;
    }
    this.processing = true;
    try {
      const { number, expiry, cvc, remember } = this.cardForm.value;
      const sanitizedNumber = String(number ?? '').replace(/\s+/g, '');
      const [mm, yy] = String(expiry ?? '').split(/[\/\s]/);

      // send sanitizedNumber, mm, yy, cvc, remember to your gateway
      // await charge(...)
    } finally {
      this.processing = false;
    }
  }

  placeOrder() {
    if (this.addressForm.invalid || !this.consentControl.value) {
      return;
    }

    console.log('Order submitted:', {
      customer: this.addressForm.value,
      payment: this.paymentControl.value,
      consent: this.consentControl.value,
    });
    alert('Vielen Dank für deine Bestellung!');
    this.cartService.clearCart();
    this.router.navigateByUrl('/');
  }
}

/* ================= Validators ================= */
function digitsAndSpacesOnly(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const v = (control.value ?? '').toString();
    if (!v) return null;
    return /^[\d\s]+$/.test(v) ? null : { digitsOnly: true };
  };
}

// checks if credit card number is valid
function luhnValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const raw = (control.value ?? '').toString().replace(/\s+/g, '');
    if (!raw) return null;
    if (!/^\d+$/.test(raw)) return { luhn: true };

    let sum = 0;
    let dbl = false;
    for (let i = raw.length - 1; i >= 0; i--) {
      let d = raw.charCodeAt(i) - 48;
      if (dbl) {
        d *= 2;
        if (d > 9) d -= 9;
      }
      sum += d;
      dbl = !dbl;
    }
    return sum % 10 === 0 ? null : { luhn: true };
  };
}

/** Validates MM/YY and ensures the card is not expired (month precision). */
function expiryValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const v = (control.value ?? '').toString().trim();
    if (!v) return null;

    const m = /^(\d{2})[\/\s]?(\d{2})$/.exec(v);
    if (!m) return { expiryFormat: true };

    const mm = parseInt(m[1], 10);
    const yy = parseInt(m[2], 10);
    if (mm < 1 || mm > 12) return { expiryMonth: true };

    const fullYear = 2000 + yy;
    const expiryEdge = new Date(fullYear, mm, 1);
    const now = new Date();
    const currentEdge = new Date(now.getFullYear(), now.getMonth(), 1);

    return expiryEdge >= currentEdge ? null : { expiryPast: true };
  };
}
