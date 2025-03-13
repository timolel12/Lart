import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { OrderDialogComponent } from '../../dialogs/order-dialog/order-dialog.component';
import { LoadingDialogComponent } from '../../dialogs/loading-dialog/loading-dialog.component';
import { MatDividerModule } from '@angular/material/divider';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatToolbarModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule
  ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit{
  constructor(  public dialog: MatDialog,
                public router: Router  ){}

  products = [
    { id: 'christmas', name: 'Weihnachten', image: 'assets/images/slideshow_xmas/slide171.jpeg' },
    { id: 'other', name: 'Bilder und mehr', image: 'assets/images/slideshow/slide1.jpeg' },
  ];

  ngOnInit(): void {
    this.dialog.open(LoadingDialogComponent, {
      disableClose: true,
      height: '100vh', 
      width: '100vw',
      maxWidth: '100vw'
    });

    setTimeout(() => {
      this.dialog.closeAll();
     }, 500);
  }

  viewProductDetails(id: string) {
    this.router.navigate(['/products', id]);
  }

  openOrderDialog(){
    let dialog = this.dialog.open(OrderDialogComponent, {
      disableClose: true,
      height: '100vh', 
      width: '100vw',
      maxWidth: '100vw'
    });
  }

}
