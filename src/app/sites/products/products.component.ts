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
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent {
  constructor(public dialog: MatDialog){}

  diashowImages = [
    { img: "assets/images/slideshow/slide1.jpeg", id: 'img1', alt: 'Slide 1' },
    { img: "assets/images/slideshow/slide2.jpeg", id: 'img2', alt: 'Slide 2' },
    { img: "assets/images/slideshow/slide2.1.jpeg", id: 'img2.1', alt: 'Slide 2.1' },
    { img: "assets/images/slideshow/slide3.jpeg", id: 'img3', alt: 'Slide 3' },
    { img: "assets/images/slideshow/slide3.1.jpeg", id: 'img3.1', alt: 'Slide 3.1' },
    { img: "assets/images/slideshow/slide3.2.jpeg", id: 'img3.2', alt: 'Slide 3.2' },
    { img: "assets/images/slideshow/slide4.jpeg", id: 'img4', alt: 'Slide 4' },
    { img: "assets/images/slideshow/slide5.jpeg", id: 'img5', alt: 'Slide 5' },
    { img: "assets/images/slideshow/slide5.1.jpeg", id: 'img5.1', alt: 'Slide 5.1' },
    { img: "assets/images/slideshow/slide6.jpeg", id: 'img6', alt: 'Slide 6' },
    { img: "assets/images/slideshow/slide7.jpeg", id: 'img7', alt: 'Slide 7' },
    { img: "assets/images/slideshow/slide8.jpeg", id: 'img8', alt: 'Slide 8' },
    { img: "assets/images/slideshow/slide8.1.jpeg", id: 'img8.1', alt: 'Slide 8.1' },
    { img: "assets/images/slideshow/slide9.jpeg", id: 'img9', alt: 'Slide 9' },
    { img: "assets/images/slideshow/slide9.1.jpeg", id: 'img9.1', alt: 'Slide 9.1' },
    { img: "assets/images/slideshow/slide9.2.jpeg", id: 'img9.2', alt: 'Slide 9.2' },
    { img: "assets/images/slideshow/slide10.jpeg", id: 'img10', alt: 'Slide 10' },
    { img: "assets/images/slideshow/slide10.1.jpeg", id: 'img10.1', alt: 'Slide 10.1' },
    { img: "assets/images/slideshow/slide11.jpeg", id: 'img11', alt: 'Slide 11' },
    { img: "assets/images/slideshow/slide12.jpeg", id: 'img12', alt: 'Slide 12' },
    { img: "assets/images/slideshow/slide12.1.jpeg", id: 'img12.1', alt: 'Slide 12.1' },
    { img: "assets/images/slideshow/slide13.jpeg", id: 'img13', alt: 'Slide 13' },
    { img: "assets/images/slideshow/slide14.jpeg", id: 'img14', alt: 'Slide 14' },
    { img: "assets/images/slideshow/slide14.1.jpeg", id: 'img14.1', alt: 'Slide 14.1' },
    { img: "assets/images/slideshow/slide14.2.jpeg", id: 'img14.2', alt: 'Slide 14.2' },
    { img: "assets/images/slideshow/slide15.jpeg", id: 'img15', alt: 'Slide 15' },
    { img: "assets/images/slideshow/slide15.1.jpeg", id: 'img15.1', alt: 'Slide 15.1' },
    { img: "assets/images/slideshow/slide16.jpeg", id: 'img16', alt: 'Slide 16' }
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
