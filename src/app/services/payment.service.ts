import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { ApiService } from './api-client.service';
import { Cart } from './cart.service';

declare var Stripe: any;

@Injectable({ providedIn: 'root' })
export class PaymentService {
  private stripe: any;
  
  constructor(private apiClient: ApiService) {}

  async initStripe(): Promise<void> {
    if (!this.stripe) {
      const config = await firstValueFrom(
        this.apiClient.get<{ publishableKey: string }>('config/stripe-key')
      );
      this.stripe = Stripe(config.publishableKey);
    }
  }

  getStripeInstance(): any {
    if (!this.stripe) throw new Error('Stripe is not initialized');
    return this.stripe;
  }
  
  async createCheckoutSession(cart: Cart): Promise<{ sessionId: string }> {
    try {
      return await firstValueFrom(
        this.apiClient.post<{ sessionId: string }>(
          'payment/create-checkout-session',
          { items: cart.items }
        )
      );
    } catch (error) {
      console.error('Failed to create checkout session', error);
      throw error;
    }
  }
}
