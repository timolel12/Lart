import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { DiashowComponent } from '../../components/diashow/diashow.component';

@Component({
  selector: 'app-product-diashow',
  standalone: true,
  imports: [
      CommonModule,
      MatCardModule,
      MatButtonModule,
      MatIconModule,
      DiashowComponent],
  templateUrl: './product-diashow.component.html',
  styleUrl: './product-diashow.component.scss'
})
export class ProductDiashowComponent implements OnInit {
  product: any;
  currentImageIndex = 0;
  loadedDiashow = new Diashow();

  xmasImages = [
    { img: "assets/images/slideshow_xmas/slide171.jpeg", id: 'img171', title: 'Magical Christmas Night', description: 'A festive Christmas scene with warm lights.' },
    { img: "assets/images/slideshow_xmas/slide172.jpeg", id: 'img172', title: 'Snowy Decorations', description: 'Snow-covered Christmas decorations in a cozy setting.' },
    { img: "assets/images/slideshow_xmas/slide181.jpeg", id: 'img181', title: 'Christmas Tree Glow', description: 'A beautifully decorated Christmas tree at night.' },
    { img: "assets/images/slideshow_xmas/slide182.jpeg", id: 'img182', title: 'Holiday Lights', description: 'Holiday lights shining brightly in the evening.' },
    { img: "assets/images/slideshow_xmas/slide191.jpeg", id: 'img191', title: 'Christmas Joy', description: 'Christmas ornaments and gifts under the tree.' },
];

picsAndMoreImages = [
    { img: "assets/images/slideshow/slide1.jpeg", id: 'img1', title: 'Sunset Over Mountains', description: 'A breathtaking sunset over the mountains.' },
    { img: "assets/images/slideshow/slide2.jpeg", id: 'img2', title: 'Serene Beach', description: 'A calm beach with crystal-clear water.' },
    { img: "assets/images/slideshow/slide3.jpeg", id: 'img3', title: 'Autumn Forest Path', description: 'A serene forest path in autumn colors.' },
    { img: "assets/images/slideshow/slide4.jpeg", id: 'img4', title: 'City Lights', description: 'A vibrant city street full of life and color.' },
    { img: "assets/images/slideshow/slide5.jpeg", id: 'img5', title: 'Snowy Peaks', description: 'A snowy mountain peak standing tall.' },
];

  constructor(private route: ActivatedRoute,
              private router: Router) {}

  ngOnInit(): void {
    // Get the string id from the route
    const productId = this.route.snapshot.paramMap.get('id')!;
    this.loadProductDetails(productId);
  }

  // Method to load product details based on the string ID
  loadProductDetails(id: string) {
    const productType = Object.values(DiashowType).find(value => value === id) as DiashowType;
    
    if (!productType) {
      console.log("Invalid product ID");
      return;
    }

    switch (productType) {
      case DiashowType.XMAS:
        this.loadedDiashow.id = "Weihnachten"
        this.loadedDiashow.images = this.xmasImages
        break;
      case DiashowType.OTHER:
        this.loadedDiashow.id = "Bilder und mehr"
        this.loadedDiashow.images = this.picsAndMoreImages;
        break;
      default:
        console.log("Unknown product type");
  }

  }

  backToProducts() {
    //TODO: effect for navigating
    this.router.navigate(["/products"]);
  }
}

export class Diashow {
  constructor(
    public id: string = '', 
    public images: { img: string; id: string; title: string; description: string }[] = [] 
    
  ) {}
}
export enum DiashowType {
  XMAS = "christmas",
  OTHER = "other",
  UNDEFINED = ""
}

