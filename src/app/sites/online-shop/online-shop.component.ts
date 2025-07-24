import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShopProduct } from '../../models/shop-product.model';

@Component({
  selector: 'app-online-shop',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './online-shop.component.html',
  styleUrl: './online-shop.component.scss',
})
export class OnlineShopComponent implements OnInit {
  products: ShopProduct[] = [];

  ngOnInit(): void {
    this.products = [
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
  }
}
