import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CartService } from '../../../services/cart.service';

@Component({
  selector: 'app-checkout-result-component',
  standalone: true,
  imports: [CommonModule, RouterModule, MatButtonModule],
  templateUrl: './checkout-result-component.component.html',
  styleUrl: './checkout-result-component.component.scss',
})
export class CheckoutResultComponent implements OnInit {
  title: string = '';
  message: string = '';
  image: string = '';
  colorClass: string = '';
  buttonLabel: string = '';
  buttonLink: string = '';

  constructor(private route: ActivatedRoute, private cartService: CartService ) {}

  ngOnInit(): void {
    const resultType = this.route.snapshot.routeConfig?.path;

    if (resultType?.includes('success')) {
      this.cartService.clearCart();
      this.title = 'Danke für deinen Einkauf! ❤️';
      this.message =
        'Deine Bezahlung war erfolgreich. Eine Bestätigungsmail wurde versendet.';
      this.image = 'https://cdn-icons-png.flaticon.com/512/845/845646.png';
      this.colorClass = 'success';
      this.buttonLabel = 'Zurück zur Homepage';
      this.buttonLink = '/';
    } else {
      this.title = 'Transaktion abgebrochen';
      this.message =
        'Die Bezahlung wurde nicht durchgeführt. Bitte probiere es noch einmal.';
      this.image = 'https://cdn-icons-png.flaticon.com/512/463/463612.png';
      this.colorClass = 'cancel';
      this.buttonLabel = 'Nochmal Probieren';
      this.buttonLink = '/checkout';
    }
  }
}
