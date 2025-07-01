import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [MatToolbarModule, MatButtonModule],
  templateUrl: './app-footer.component.html',
  styleUrl: './app-footer.component.scss',
})
export class AppFooterComponent {
  constructor(private router: Router) {}

  navigateImpressum() {
    this.router.navigate(['/impressum']);
  }

  navigateDatenschutz() {
    this.router.navigate(['/datenschutz']);
  }

  openWhatsapp() {
    window.open('https://wa.me/c/4915126593771', '_blank');
  }

  openInstagram() {
    window.open('https://www.instagram.com/l.art_handmade/', '_blank');
  }

  openEtsy() {
    window.open('https://www.etsy.com/de/shop/LarthandmadeShop', '_blank');
  }
}
