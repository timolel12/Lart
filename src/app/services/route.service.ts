import { Injectable } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class RouteService {
  private isCheckoutSubject = new BehaviorSubject<boolean>(false);
  isCheckout$ = this.isCheckoutSubject.asObservable();

  constructor(private router: Router) {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        const isCheckout = this.checkIfCheckout();
        this.isCheckoutSubject.next(isCheckout);
      });
  }

  private checkIfCheckout(): boolean {
    const currentUrl = this.router.url.split('?')[0];
    const segments = currentUrl
      .split('/')
      .filter((segment) => segment.length > 0);

    return segments.includes('checkout');
  }
}
