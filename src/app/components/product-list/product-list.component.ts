import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ShopProduct } from '../../models/shop-product.model';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss',
})
export class ProductListComponent {
  @Input() displayedProducts: ShopProduct[] = [];
}
