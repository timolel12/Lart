import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CartItem } from '../../services/cart.service';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-cart-item',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule],
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.scss'],
})
export class CartItemComponent {
  @Input() item!: CartItem;
  @Output() qtyChange = new EventEmitter<{ id: string; qty: number }>();
  @Output() remove = new EventEmitter<string>();

  inc() {
    this.qtyChange.emit({ id: this.item.id, qty: this.item.quantity + 1 });
  }
  dec() {
    this.qtyChange.emit({ id: this.item.id, qty: this.item.quantity - 1 });
  }
}
