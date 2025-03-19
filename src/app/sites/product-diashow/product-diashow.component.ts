import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { DiashowComponent } from '../../components/diashow/diashow.component';
import {
  allgemeinImages,
  weihnachtenWinterImages,
  osternImages,
  herbstImages,
  familienGeschenkeImages,
  geschenkSetImages,
  glueckImages,
  hochzeitImages,
  kerzenKerzenhalterImages,
  kopfschmuckImages,
  leinwaendeImages,
  taufeUndMehrImages,
} from '../../models/pictures.model';
import { preserveWhitespacesDefault } from '@angular/compiler';

@Component({
  selector: 'app-product-diashow',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    DiashowComponent,
  ],
  templateUrl: './product-diashow.component.html',
  styleUrl: './product-diashow.component.scss',
})
export class ProductDiashowComponent implements OnInit {
  product: any;
  currentImageIndex = 0;
  loadedDiashow = new Diashow();

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    // Get the string id from the route
    const productId = this.route.snapshot.paramMap.get('id')!;
    this.loadProductDetails(productId);
  }

  // Method to load product details based on the string ID
  loadProductDetails(id: string) {
    const productType = Object.values(DiashowType).find(
      (value) => value === id
    ) as DiashowType;

    if (!productType) {
      console.log('Invalid product ID');
      return;
    }

    switch (productType) {
      case DiashowType.FAMILY:
        this.loadedDiashow.images = familienGeschenkeImages;
        break;
      case DiashowType.PRESENTS:
        this.loadedDiashow.images = geschenkSetImages;
        break;
      case DiashowType.LUCK:
        this.loadedDiashow.images = glueckImages;
        break;
      case DiashowType.AUTUMN:
        this.loadedDiashow.images = herbstImages;
        break;
      case DiashowType.MARIAGE:
        this.loadedDiashow.images = hochzeitImages;
        break;
      case DiashowType.CANDLES:
        this.loadedDiashow.images = kerzenKerzenhalterImages;
        break;
      case DiashowType.PAINTINGS:
        this.loadedDiashow.images = leinwaendeImages;
        break;
      case DiashowType.EASTER:
        this.loadedDiashow.images = osternImages;
        break;
      case DiashowType.RELIGION:
        this.loadedDiashow.images = taufeUndMehrImages;
        break;
      case DiashowType.HEADDRESS:
        this.loadedDiashow.images = kopfschmuckImages;
        break;
      case DiashowType.XMAS:
        this.loadedDiashow.images = weihnachtenWinterImages;
        break;
      case DiashowType.OTHER:
        this.loadedDiashow.images = allgemeinImages;
        break;
      default:
        console.log('Unknown product type');
    }
  }

  backToProducts() {
    //TODO: effect for navigating
    this.router.navigate(['/products']);
  }
}

export class Diashow {
  constructor(
    public id: string = '',
    public images: {
      img: string;
      id: string;
      description: string;
    }[] = []
  ) {}
}
export enum DiashowType {
  FAMILY = 'family',
  PRESENTS = 'presents',
  LUCK = 'luck',
  AUTUMN = 'autumn',
  MARIAGE = 'mariage',
  CANDLES = 'candles',
  HEADDRESS = 'headdress',
  PAINTINGS = 'paintings',
  EASTER = 'easter',
  RELIGION = 'religion',
  XMAS = 'christmas',
  OTHER = 'other',
  UNDEFINED = '',
}
