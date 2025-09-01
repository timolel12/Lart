import { Component, OnInit, OnDestroy } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AppHeaderComponent } from './components/app-header/app-header.component';
import { AppFooterComponent } from './components/app-footer/app-footer.component';
import { CommonModule } from '@angular/common';
import { CartService } from './services/cart.service';
import { CartSidebarComponent } from './components/cart-sidebar/cart-sidebar.component';
import { MatSidenavModule } from '@angular/material/sidenav';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    AppHeaderComponent,
    AppFooterComponent,
    CartSidebarComponent,
    MatSidenavModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'L.art';

  isMainPage: boolean = false;
  isCartOpen$ = this.cartService.cartOpen$;

  constructor(public cartService: CartService) {}

  ngOnInit(): void {}

  ngOnDestroy(): void {}
}
