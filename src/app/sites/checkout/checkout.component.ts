import { Component, OnInit } from '@angular/core';
import { CartService, Cart } from '../../services/cart.service';
import { firstValueFrom, Observable, switchMap, take } from 'rxjs';
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
import { PaymentService } from '../../services/payment.service';
import { MatDialog } from '@angular/material/dialog';
import { ProcessingPaymentDialogComponent } from '../../dialogs/processing-payment-dialog/processing-payment-dialog.component';
import { LoadingDialogComponent } from '../../dialogs/loading-dialog/loading-dialog.component';
import { PaymentMethod } from '../../models/payment-method.model';


type FormPaymentMethod = 'paypal' | 'sofort' | 'card';

declare var Stripe: any;

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
  stripeUnavailable = false;

  PaymentMethod = PaymentMethod;
  
  cart$!: Observable<Cart>;
  step: 1 | 2 = 1;

  shippingCost = 4.99;

  paymentControl = new FormControl<FormPaymentMethod>('paypal', {
    nonNullable: true,
  });
  consentControl = new FormControl<boolean>(true, { nonNullable: true });

  addressForm!: FormGroup;
  processing = false;

  constructor(
    private cartService: CartService,
    private paymentService: PaymentService,
    private dialog: MatDialog,
    private router: Router,
    private fb: FormBuilder
  ) {}

  async ngOnInit(): Promise<void> {
    const loadingDialog = this.dialog.open(LoadingDialogComponent, {
      disableClose: true,
    });

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

    try {
      await this.paymentService.initStripe();
      console.log('Stripe initialized!');
    } catch (err) {
      console.error('Failed to initialize Stripe', err);
      // optionally show an error message to the user
      this.stripeUnavailable = true;
    } finally {
      loadingDialog.close();
    }
  }

  invalid(ctrlPath: string): boolean {
    const ctrl = this.addressForm.get(ctrlPath);
    return !!ctrl && ctrl.invalid && (ctrl.dirty || ctrl.touched);
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

  async placeOrder(paymentMethod: PaymentMethod) {
    if (this.addressForm.invalid || !this.consentControl.value) return;

    const processingDialog = this.dialog.open(
      ProcessingPaymentDialogComponent,
      {
        disableClose: true,
      }
    );

    try {
      const cart = await firstValueFrom(this.cart$.pipe(take(1)));

      // call service to get sessionId
      const { sessionId } = await this.paymentService.createCheckoutSession(
        cart, paymentMethod
      );

      // close the dialog BEFORE redirect
      processingDialog.close();

      // redirect to Stripe
      const stripe = this.paymentService.getStripeInstance();
      stripe.redirectToCheckout({ sessionId });
    } catch (error) {
      processingDialog.close();
      console.error(error);
    }
  }

  backToHome() {
    this.router.navigate(['/']);
  }

  goBackToStep1(): void {
  this.step = 1;
}

}
