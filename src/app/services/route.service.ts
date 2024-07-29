import { Injectable } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RouteService {
  private singleSegmentRouteSubject = new BehaviorSubject<boolean>(false);
  singleSegmentRoute$ = this.singleSegmentRouteSubject.asObservable();

  constructor(private router: Router) {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      const isSingleSegment = this.checkSingleSegmentRoute();
      this.singleSegmentRouteSubject.next(isSingleSegment);
      console.log(isSingleSegment)
    });
  }

  private checkSingleSegmentRoute(): boolean {
    const currentUrl = this.router.url;
    const segments = currentUrl.split('/').filter(segment => segment.length > 0);
    return segments.length === 0; // Return true if it's the root route
  }
}
