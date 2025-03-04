import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { DiashowComponent } from '../../components/diashow/diashow.component';
import { OrderDialogComponent } from '../../dialogs/order-dialog/order-dialog.component';
import { LoadingDialogComponent } from '../../dialogs/loading-dialog/loading-dialog.component';


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
export class ProductsComponent implements OnInit{
  constructor(public dialog: MatDialog){}

  xmasImages = [
    { img: "assets/images/slideshow_xmas/slide171.jpeg", id: 'img171', alt: 'Slide 171' },
    { img: "assets/images/slideshow_xmas/slide172.jpeg", id: 'img172', alt: 'Slide 172' },
    { img: "assets/images/slideshow_xmas/slide181.jpeg", id: 'img181', alt: 'Slide 181' },
    { img: "assets/images/slideshow_xmas/slide182.jpeg", id: 'img182', alt: 'Slide 182' },
    { img: "assets/images/slideshow_xmas/slide191.jpeg", id: 'img191', alt: 'Slide 191' },
    { img: "assets/images/slideshow_xmas/slide192.jpeg", id: 'img192', alt: 'Slide 192' },
    { img: "assets/images/slideshow_xmas/slide193.jpeg", id: 'img193', alt: 'Slide 193' },
    { img: "assets/images/slideshow_xmas/slide20.jpeg", id: 'img20', alt: 'Slide 20' },
    { img: "assets/images/slideshow_xmas/slide211.jpeg", id: 'img211', alt: 'Slide 211' },
    { img: "assets/images/slideshow_xmas/slide212.jpeg", id: 'img212', alt: 'Slide 212' },
    { img: "assets/images/slideshow_xmas/slide221.jpeg", id: 'img221', alt: 'Slide 221' },
    { img: "assets/images/slideshow_xmas/slide222.jpeg", id: 'img222', alt: 'Slide 222' },
    { img: "assets/images/slideshow_xmas/slide23.jpeg", id: 'img23', alt: 'Slide 23' },
    { img: "assets/images/slideshow_xmas/slide241.jpeg", id: 'img241', alt: 'Slide 241' },
    { img: "assets/images/slideshow_xmas/slide242.jpeg", id: 'img242', alt: 'Slide 242' },
    { img: "assets/images/slideshow_xmas/slide25.jpeg", id: 'img25', alt: 'Slide 25' },
    { img: "assets/images/slideshow_xmas/slide26.jpeg", id: 'img26', alt: 'Slide 26' },
    { img: "assets/images/slideshow_xmas/slide271.jpeg", id: 'img271', alt: 'Slide 271' },
    { img: "assets/images/slideshow_xmas/slide272.jpeg", id: 'img272', alt: 'Slide 272' },
    { img: "assets/images/slideshow_xmas/slide273.jpeg", id: 'img273', alt: 'Slide 273' },
    { img: "assets/images/slideshow_xmas/slide274.jpeg", id: 'img274', alt: 'Slide 274' },
    { img: "assets/images/slideshow_xmas/slide275.jpeg", id: 'img275', alt: 'Slide 275' },
    { img: "assets/images/slideshow_xmas/slide276.jpeg", id: 'img276', alt: 'Slide 276' },
    { img: "assets/images/slideshow_xmas/slide281.jpeg", id: 'img281', alt: 'Slide 281' },
    { img: "assets/images/slideshow_xmas/slide282.jpeg", id: 'img282', alt: 'Slide 282' },
    { img: "assets/images/slideshow_xmas/slide29.jpeg", id: 'img29', alt: 'Slide 29' },
    { img: "assets/images/slideshow_xmas/slide311.jpeg", id: 'img311', alt: 'Slide 311' },
    { img: "assets/images/slideshow_xmas/slide312.jpeg", id: 'img312', alt: 'Slide 312' },
    { img: "assets/images/slideshow_xmas/slide321.jpeg", id: 'img321', alt: 'Slide 321' },
    { img: "assets/images/slideshow_xmas/slide322.jpeg", id: 'img322', alt: 'Slide 322' },
    { img: "assets/images/slideshow_xmas/slide323.jpeg", id: 'img323', alt: 'Slide 323' }
  ];

  picsAndMoreImages = [
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

  ngOnInit(): void {
    this.dialog.open(LoadingDialogComponent, {
      disableClose: true,
      height: '100vh', 
      width: '100vw',
      maxWidth: '100vw'
    });

    setTimeout(() => {
      this.dialog.closeAll();
     }, 2000);
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
