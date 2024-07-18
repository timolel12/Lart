import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { DiashowComponent } from '../../components/diashow/diashow.component';
import { OrderDialogComponent } from '../../dialogs/order-dialog/order-dialog.component';


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
    DiashowComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  constructor(public dialog: MatDialog){}

  diashowImages = [
    { img: "assets/images/slideshow/slide1.png", id: 'img1', alt: 'Slide 1' },
    { img: "assets/images/slideshow/slide2.png", id: 'img2', alt: 'Slide 2' },
    { img: "assets/images/slideshow/slide3.jpeg", id: 'img3', alt: 'Slide 3' },
    { img: "assets/images/slideshow/slide4.jpeg", id: 'img4', alt: 'Slide 4' }
  ];

  openOrderDialog(){
    let dialog = this.dialog.open(OrderDialogComponent, {
      disableClose: true,
      height: '100vh', 
      width: '100vw',
      maxWidth: '100vw'
    });
  }

}
