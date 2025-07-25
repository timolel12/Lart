import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShopProduct } from '../../models/shop-product.model';
import { ShopCategory } from '../../models/shop-category.model';
import { ActivatedRoute } from '@angular/router';
import { ProductListComponent } from '../../components/product-list/product-list.component';
import { CategoryListComponent } from '../../components/category-list/category-list.component';

@Component({
  selector: 'app-online-shop',
  standalone: true,
  imports: [CommonModule, ProductListComponent, CategoryListComponent],
  templateUrl: './online-shop.component.html',
  styleUrl: './online-shop.component.scss',
})

export class OnlineShopComponent implements OnInit {
  currentCategory: string | null = null;
  currentSubcategory: string | null = null;
  productList: ShopProduct[] = [];
  categoryList: ShopCategory[] = [];
  view: string | null = null;

  sampleProducts: ShopProduct[] = [
      {
        id: 1,
        title: 'Glücksbärchen',
        description: 'Ein kleiner Glücksbringer als Deko',
        price: 8.99,
        imageUrl: 'assets/images/Geschenk_Set/13.jpeg',
      },
      {
        id: 2,
        title: '... Ich hab dich lieb',
        description: 'Gruß an einen deiner Liebsten',
        price: 10.99,
        imageUrl: 'assets/images/Familien_Geschenke/2.jpeg',
      },
      {
        id: 3,
        title: 'Untersetzer mit Botschaft',
        description:
          'Für Getränke. Oder andere Sachen. Hauptsächlich für Getränke',
        price: 4.99,
        imageUrl: 'assets/images/Allgemein/12.jpeg',
      },
    ];

  constructor(private route: ActivatedRoute) {}

   ngOnInit(): void {
     this.route.paramMap.subscribe(params => {
    const category = params.get('category');
    const subcategory = params.get('subcategory');

    if (!category && !subcategory) {
      this.view = 'home'; // default view
      this.productList = this.getBestSellers();
      this.categoryList = this.getCategories();
    } else if (category && !subcategory) {
      this.view = 'category';
      this.currentCategory = category;
      this.categoryList = this.getSubcategories(category);
      this.productList = this.getCategoryProducts(category);
    } else if (category && subcategory) {
      this.view = 'subcategory';
      this.currentCategory = category;
      this.currentSubcategory = subcategory;
      this.productList = this.getSubcategoryProducts(category, subcategory);
    }
      this.productList = this.sampleProducts;
    });
  }

  // Products
  getBestSellers(): ShopProduct[] {
    return this.sampleProducts;
  }

  getCategoryProducts(category: string): ShopProduct[] {
    return this.sampleProducts;
  }

  getSubcategoryProducts(category: string, subcategory: string): ShopProduct[] {
    return this.sampleProducts;
  }

  // Categories
  getCategories(): ShopCategory[] {
    let mainCategoryList: ShopCategory[] = [
      {
        title: 'Alle Produkte',
        representingImageUrl: 'assets/images/Familien_Geschenke/1.jpeg'
      },
      {
        title: 'Anlässe',
        representingImageUrl: 'assets/images/Hochzeit/3.jpeg'
      },
      {
        title: 'Feiertage',
        representingImageUrl: 'assets/images/Weihnachten_Winter/6.jpeg'
      },
      {
        title: 'Gipsfiguren',
        representingImageUrl:  'assets/images/Allgemein/4.jpeg'
      },
      {
        title: 'Kerzen',
        representingImageUrl: 'assets/images/Kerzen_Kerzenhalter/1.jpeg'
      },
      {
        title: 'Sonstige',
        representingImageUrl: 'assets/images/Kopfschmuck/grgoe1.jpeg'
      }
    ];
    return mainCategoryList;
  }

  getSubcategories(subcategory: string): ShopCategory[] {

    return [];
  }
}
