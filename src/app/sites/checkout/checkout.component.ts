import { Component, OnInit } from '@angular/core';
import { CartService, Cart } from '../../services/cart.service';
import { Observable } from 'rxjs';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss',
})
export class CheckoutComponent implements OnInit {
  cart$!: Observable<Cart>;

  // Simple form model
  customer = {
    name: '',
    email: '',
    address: '',
    payment: 'card',
  };

  constructor(private router: Router, private cartService: CartService) {}

  navigate(path: string) {
    this.router.navigate([path]);
  }

  ngOnInit(): void {
    this.cart$ = this.cartService.cart$;
  }

  onSubmit() {
    console.log('Order submitted:', {
      customer: this.customer,
      cart: this.cart$,
    });

    alert('Vielen Dank für Ihre Bestellung!');
    this.cartService.clearCart();
  }
}
