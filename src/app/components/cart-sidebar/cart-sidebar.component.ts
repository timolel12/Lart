import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { CartService } from '../../services/cart.service';
import { CartItemComponent } from '../cart-item/cart-item.component';

@Component({
  selector: 'app-cart-sidebar',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatDividerModule,
    CartItemComponent,
  ],
  templateUrl: './cart-sidebar.component.html',
  styleUrls: ['./cart-sidebar.component.scss'],
})
export class CartSidebarComponent {
  cart$ = this.cartService.cart$;
  cartOpen$ = this.cartService.cartOpen$;

  constructor(private cartService: CartService, private router: Router) {}

  close() {
    this.cartService.closeCart();
  }

  onQtyChange(e: { id: string; qty: number }) {
    this.cartService.updateQuantity(e.id, e.qty);
  }

  onRemove(id: string) {
    this.cartService.removeItem(id);
  }

  checkout() {
    this.close();
    this.router.navigate(['/checkout']);
  }
}
