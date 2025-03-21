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
    MatDividerModule,
  ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
})
export class ProductsComponent implements OnInit {
  constructor(public dialog: MatDialog, public router: Router) {}

  products = [
    {
      id: 'other',
      name: 'Allgemein',
      mainImage: 'assets/images/Allgemein/1.jpeg',
    },
    {
      id: 'family',
      name: 'Familien Geschenke',
      mainImage: 'assets/images/Familien_Geschenke/1.jpeg',
    },
    {
      id: 'presents',
      name: 'Geschenk Sets',
      mainImage: 'assets/images/Geschenk_Set/1.png',
    },
    {
      id: 'luck',
      name: 'Viel Glück',
      mainImage: 'assets/images/Glueck/1.jpeg',
    },
    { id: 'autumn', name: 'Herbst', mainImage: 'assets/images/Herbst/1.jpeg' },
    {
      id: 'mariage',
      name: 'Hochzeit Geschenke',
      mainImage: 'assets/images/Hochzeit/1.jpeg',
    },
    {
      id: 'candles',
      name: 'Kerzen und Kerzenhalter',
      mainImage: 'assets/images/Kerzen_Kerzenhalter/1.jpeg',
    },
    {
      id: 'headdress',
      name: 'Kopfschumck',
      mainImage: 'assets/images/Kopfschmuck/grgoe2.jpeg',
    },
    {
      id: 'paintings',
      name: 'Leinwand Gemälde',
      mainImage: 'assets/images/Leinwaende/1.jpeg',
    },
    { id: 'easter', name: 'Ostern', mainImage: 'assets/images/Ostern/1.jpeg' },
    {
      id: 'religion',
      name: 'Kommunion, Konfirmation, Taufe',
      mainImage: 'assets/images/Taufe_und_mehr/1.jpeg',
    },
    {
      id: 'christmas',
      name: 'Weihnachten',
      mainImage: 'assets/images/Weihnachten_Winter/1.jpeg',
    },
  ];

  ngOnInit(): void {
    this.dialog.open(LoadingDialogComponent, {
      disableClose: true,
      height: '100vh',
      width: '100vw',
      maxWidth: '100vw',
    });

    setTimeout(() => {
      this.dialog.closeAll();
    }, 500);
  }

  viewProductDetails(id: string) {
    this.router.navigate(['/products', id]);
  }

  openOrderDialog() {
    let dialog = this.dialog.open(OrderDialogComponent, {
      disableClose: true,
      height: '100vh',
      width: '100vw',
      maxWidth: '100vw',
    });
  }
}
