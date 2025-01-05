import { Component, OnInit, OnDestroy } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AppHeaderComponent } from './components/app-header/app-header.component';
import { AppFooterComponent } from './components/app-footer/app-footer.component';
import { RouteService } from './services/route.service';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { LoadingDialogComponent } from './dialogs/loading-dialog/loading-dialog.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, AppHeaderComponent, AppFooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'L.art';

  isMainPage: boolean = false;
  routeSubscription: Subscription = new Subscription();

  constructor(private routeService: RouteService,
              private dialog: MatDialog) {}

  ngOnInit(): void {
    this.routeSubscription = this.routeService.singleSegmentRoute$.subscribe(isSingleSegment => {
      this.isMainPage = isSingleSegment;
    });

    //show loading animation for some seconds until page is loaded
    this.dialog.open(LoadingDialogComponent, {
          panelClass: "transparent-dialog",
          width: '100vw',
          height: '100vh',
          maxWidth: 'none',
          maxHeight: 'none',
          disableClose: true
        });

    setTimeout(() => {
          this.dialog.closeAll();
        }, 1500);
  }

  ngOnDestroy(): void {
    if (this.routeSubscription) {
      this.routeSubscription.unsubscribe();
    }
  }
}
