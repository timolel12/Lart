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
      name: 'Electronics',
      children: [
        { label: 'Hardware', path: '/online-shop/electronics/hardware' },
        { label: 'Software', path: '/online-shop/electronics/software' },
      ],
    },
    {
      name: 'Clothing',
      children: [
        { label: 'Men', path: '/online-shop/clothing/men' },
        { label: 'Women', path: '/online-shop/clothing/women' },
      ],
    },
    {
      name: 'Books',
      children: [
        { label: 'Fantasy', path: '/online-shop/books/fantasy' },
        { label: 'Non-fiction', path: '/online-shop/books/non-fiction' },
      ],
    },
  ];

  constructor(private router: Router, private routeService: RouteService) {
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

  showMegaMenu() {
    clearTimeout(this.hideTimeout);
    this.megaMenuVisible = true;
  }

  hideMegaMenuDelayed() {
    this.hideTimeout = setTimeout(() => {
      this.megaMenuVisible = false;
    }, 900); // 300ms delay before hiding
  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  navigate(path: string) {
    this.menuOpen = false;
    this.router.navigate([path]);
  }
}
