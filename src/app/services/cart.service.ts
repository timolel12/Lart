// src/app/cart/cart.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface CartItem {
  id: string;
  title: string;
  price: number;
  quantity: number;
  imageUrl?: string;
}

export interface Cart {
  items: CartItem[];
  totalQuantity: number;
  totalPrice: number;
}

const STORAGE_KEY = 'my-shop-cart';

@Injectable({ providedIn: 'root' })
export class CartService {
  private _cart$ = new BehaviorSubject<Cart>(this._loadInitialCart());
  cart$ = this._cart$.asObservable();

  private _cartOpen$ = new BehaviorSubject<boolean>(false);
  cartOpen$ = this._cartOpen$.asObservable();

  // Opens the sidebar
  openCart() {
    this._cartOpen$.next(true);
    console.log(this._cartOpen$.getValue());
  }

  // Closes the sidebar
  closeCart() {
    this._cartOpen$.next(false);
  }

  addItem(item: CartItem) {
    const cart = this._clone(this._cart$.value);
    const existing = cart.items.find((i) => i.id === item.id);

    if (existing) {
      existing.quantity += item.quantity;
    } else {
      cart.items.push({ ...item });
    }
    this._recalculate(cart);
    this._update(cart);
  }

  removeItem(itemId: string) {
    const cart = this._clone(this._cart$.value);
    cart.items = cart.items.filter((i) => i.id !== itemId);
    this._recalculate(cart);
    this._update(cart);
  }

  updateQuantity(itemId: string, qty: number) {
    const cart = this._clone(this._cart$.value);
    const existing = cart.items.find((i) => i.id === itemId);
    if (existing) {
      existing.quantity = qty;
      if (existing.quantity <= 0) {
        cart.items = cart.items.filter((i) => i.id !== itemId);
      }
      this._recalculate(cart);
      this._update(cart);
    }
  }

  clearCart() {
    const empty: Cart = { items: [], totalQuantity: 0, totalPrice: 0 };
    this._update(empty);
  }

  private _recalculate(cart: Cart) {
    cart.totalQuantity = cart.items.reduce((sum, i) => sum + i.quantity, 0);
    cart.totalPrice = cart.items.reduce(
      (sum, i) => sum + i.price * i.quantity,
      0
    );
  }

  private _update(cart: Cart) {
    this._cart$.next(cart);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
  }

  private _loadInitialCart(): Cart {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch {}
    }
    return { items: [], totalQuantity: 0, totalPrice: 0 };
  }

  private _clone<T>(obj: T): T {
    return JSON.parse(JSON.stringify(obj));
  }
}
