import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common'; // Import CommonModule
import { filter, map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, MatToolbarModule, MatListModule, MatCardModule], // Add CommonModule here
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.scss']
})
export class AppHeaderComponent {
  activeLink$: Observable<string>;

  constructor(private router: Router) {
    this.activeLink$ = this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      map(() => {
        const currentUrl = this.router.url;
        const activeLink = currentUrl.split('/').pop() || 'home';
        console.log('Current router URL:', currentUrl);
        console.log('Active link:', activeLink);
        return activeLink;
      })
    );
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
