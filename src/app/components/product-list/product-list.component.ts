import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ShopProduct } from '../../models/shop-product.model';
import { CartItem, CartService } from '../../services/cart.service';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss',
})
export class ProductListComponent {
  @Input() displayedProducts: ShopProduct[] = [];

  qtyVisibleFor: string | number | null = null;
  quantityById: Partial<Record<string | number, number>> = {};

  constructor(private cartService: CartService) {}

  startAdd(product: ShopProduct): void {
    this.qtyVisibleFor = product.id;
    if (!(product.id in this.quantityById)) {
      this.quantityById[product.id] = 1;
    }
  }

  qty(id: string | number): number {
    return this.quantityById[id] ?? 1;
  }

  changeQty(product: ShopProduct, delta: number): void {
    const next = Math.max(1, this.qty(product.id) + delta);
    this.quantityById[product.id] = next;
  }

  confirmAdd(product: ShopProduct): void {
    const qty = this.qty(product.id);
    const item: CartItem = {
      id: product.id,
      title: product.title,
      price: product.price,
      quantity: qty,
    };

    this.cartService.addItem(item);
    // Optionally open the cart if you use cartOpen$
    // this.cartService.setCartOpen(true);
    this.resetQtyUI();
  }

  cancelAdd(): void {
    this.resetQtyUI();
  }

  private resetQtyUI(): void {
    this.qtyVisibleFor = null;
  }
}
