import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatDialog } from '@angular/material/dialog';
import { OrderDialogComponent } from '../../dialogs/order-dialog/order-dialog.component';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, MatDividerModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss',
})
export class ContactComponent {
  constructor(public dialog: MatDialog) {}

  openInstagram() {
    window.open('https://www.instagram.com/l.art_handmade/', '_blank');
  }

  openEtsy() {
    window.open('https://www.etsy.com/de/shop/LarthandmadeShop', '_blank');
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
