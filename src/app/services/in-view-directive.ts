import { Directive, ElementRef, HostBinding, OnInit } from '@angular/core';

@Directive({
  selector: '[appInView]',
  standalone: true,
})
export class InViewDirective implements OnInit {
  @HostBinding('class.in-view') isInView = false;

  constructor(private el: ElementRef) {}

  ngOnInit(): void {
    const observer = new IntersectionObserver(
      ([entry]) => {
        this.isInView = entry.isIntersecting;
        // 👆 TRUE when in view, FALSE when out — keeps toggling
      },
      { threshold: 0.2 }
    );

    observer.observe(this.el.nativeElement);
  }
}
