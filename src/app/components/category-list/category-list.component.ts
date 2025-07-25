import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ShopCategory } from '../../models/shop-category.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-category-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './category-list.component.html',
  styleUrl: './category-list.component.scss'
})
export class CategoryListComponent {

   constructor(private router: Router) {
     
    }

  @Input() displayedCategories: ShopCategory[] = []

  navigateToCategory(category: string) {
  const categorySlug = this.slugify(category);
  this.router.navigate(['/online-shop', categorySlug]);
}

slugify(value: string): string {
  return value.toLowerCase().replace(/\s+/g, '-');
}

}
