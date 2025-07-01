import { Component } from '@angular/core';

@Component({
  selector: 'app-online-shop',
  standalone: true,
  imports: [],
  templateUrl: './online-shop.component.html',
  styleUrl: './online-shop.component.scss'
})
export class OnlineShopComponent {
   openWhatsapp() {
    window.open('https://wa.me/c/4915126593771', '_blank');
  }
}
