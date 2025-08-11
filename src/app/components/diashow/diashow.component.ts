import { Component, Input, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'diashow',
  standalone: true,
  imports: [MatButtonModule, MatIconModule, CommonModule],
  templateUrl: './diashow.component.html',
  styleUrl: './diashow.component.scss',
})
export class DiashowComponent implements OnInit {
  @Input() slides: any[] = [];
  @Input() indicatorsVisible = true;
  @Input() autoPlay = true;

  currentSlide = 0;
  hidden = false;

  constructor() {}

  ngOnInit(): void {
    if (this.autoPlay) {
      setInterval(() => {
        this.nextPicture();
      }, 6000);
    }
  }

  nextPicture() {
    let slide = (this.currentSlide + 1) % this.slides.length;
    this.jumpToPicture(slide);
  }

  previousPicture() {
    let slide =
      (this.currentSlide - 1 + this.slides.length) % this.slides.length;
    this.jumpToPicture(slide);
  }

  jumpToPicture(index: number) {
    this.hidden = true;
    setTimeout(() => {
      this.currentSlide = index;
      this.hidden = false;
    }, 500);
  }
}
