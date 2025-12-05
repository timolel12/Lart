import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';

@Component({
  selector: 'app-checkout-result-component',
  standalone: true,
  imports: [CommonModule, RouterModule],
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

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    const resultType = this.route.snapshot.routeConfig?.path;

    if (resultType?.includes('success')) {
      this.title = 'Thank you for your purchase! ❤️';
      this.message =
        'Your payment was completed successfully. A confirmation email has been sent.';
      this.image = 'https://cdn-icons-png.flaticon.com/512/845/845646.png';
      this.colorClass = 'success';
      this.buttonLabel = 'Back to Home';
      this.buttonLink = '/';
    } else {
      this.title = 'Transaction Canceled';
      this.message =
        'Your payment did not go through. You can try again anytime.';
      this.image = 'https://cdn-icons-png.flaticon.com/512/463/463612.png';
      this.colorClass = 'cancel';
      this.buttonLabel = 'Try Again';
      this.buttonLink = '/checkout';
    }
  }
}
