import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { filter, map } from 'rxjs/operators';
import { RouteService } from '../../services/route.service';
import { Subscription, Observable } from 'rxjs';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, MatToolbarModule, MatListModule, MatCardModule],
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.scss'],
})
export class AppHeaderComponent implements OnInit, OnDestroy {
  activeLink$: Observable<string>;
  //isMainPage: boolean = false;
  menuOpen: boolean = false;
  routeSubscription: Subscription = new Subscription();

  megaMenuVisible = false;
  private hideTimeout: any = null;

  categories = [
    {
      name: 'Alle Produkte',
    },
    {
      name: 'Anlässe',
      children: [
        { label: 'Hochzeit', path: '/online-shop/anlässe/hochzeit' },
        { label: 'Taufe', path: '/online-shop/anlässe/taufe' },
      ],
    },
    {
      name: 'Feiertage',
      children: [
        { label: 'Ostern', path: '/online-shop/feiertage/ostern' },
        { label: 'Halloween/Herbst', path: '/online-shop/feiertage/halloween' },
        { label: 'Weihnachten', path: '/online-shop/feiertage/weihnachten' },
      ],
    },
    {
      name: 'Gipsfiguren',
    },
    {
      name: 'Kerzen',
      children: [
        { label: 'Kerzensets', path: '/online-shop/kerzen/kerzensets' },
        { label: 'Kerzenzubehör', path: '/online-shop/kerzen/kerzenzubehör' },
      ],
    },
    {
      name: 'Sonstige',
    },
  ];

  constructor(private router: Router) {
    this.activeLink$ = this.router.events.pipe(
      filter((event) => event instanceof NavigationEnd),
      map(() => {
        const currentUrl = this.router.url;
        const activeLink = currentUrl.split('/').pop() || 'home';
        return activeLink;
      })
    );
  }

  ngOnInit(): void {
    /*this.routeSubscription = this.routeService.singleSegmentRoute$.subscribe(
      (isSingleSegment) => {
        this.isMainPage = isSingleSegment;
      }
    );*/

    this.activeLink$ = this.router.events.pipe(
      filter((event) => event instanceof NavigationEnd),
      map(() => {
        const currentUrl = this.router.url;
        const activeLink = currentUrl.split('/').pop() || 'home';
        return activeLink;
      })
    );
  }

  ngOnDestroy(): void {
    if (this.routeSubscription) {
      this.routeSubscription.unsubscribe();
    }
  }

  navigate(path: string) {
    this.menuOpen = false;
    this.router.navigate([path]);
  }

  // online-shop functions
  navigateToShop() {
    this.router.navigate(['/online-shop']);
  }

  navigateToCategory(category: string) {
    const categorySlug = this.slugify(category);
    this.router.navigate(['/online-shop', categorySlug]);
  }

  navigateToSubCategory(category: string, subcategory: string) {
    const categorySlug = this.slugify(category);
    const subcategorySlug = this.slugify(subcategory);
    this.router.navigate(['/online-shop', categorySlug, subcategorySlug]);
  }

  slugify(value: string): string {
    return value.toLowerCase().replace(/\s+/g, '-');
  }

  showMegaMenu() {
    clearTimeout(this.hideTimeout);
    this.megaMenuVisible = true;
  }

  hideMegaMenuDelayed() {
    this.hideTimeout = setTimeout(() => {
      this.megaMenuVisible = false;
    }, 300);
  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }
}
