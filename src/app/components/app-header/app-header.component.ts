import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common'; // Import CommonModule
import { filter, map } from 'rxjs/operators';
import { RouteService } from '../../services/route.service';
import { Subscription, Observable } from 'rxjs';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, MatToolbarModule, MatListModule, MatCardModule], // Add CommonModule here
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.scss']
})
export class AppHeaderComponent implements OnInit, OnDestroy{
  activeLink$: Observable<string>;
  isMainPage: boolean = false;
  routeSubscription: Subscription = new Subscription();

  constructor(private router: Router, private routeService: RouteService) 
  {
    this.activeLink$ = this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      map(() => {
        const currentUrl = this.router.url;
        const activeLink = currentUrl.split('/').pop() || 'home';
        return activeLink;
      })
    );
  }

  ngOnInit(): void {
    this.routeSubscription = this.routeService.singleSegmentRoute$.subscribe(isSingleSegment => {
      this.isMainPage = isSingleSegment;
    });

    this.activeLink$ = this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
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

  navigateContact() {
    this.router.navigate(['/contact']);
  }

  navigateAboutUs() {
    this.router.navigate(['/about-us']);
  }

  navigateProducts() {
    this.router.navigate(['/products']);
  }

  navigateRequests() {
    this.router.navigate(['/requests']);
  }

  navigateHome() {
    this.router.navigate(['']);
  }
}
