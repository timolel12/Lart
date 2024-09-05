import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { RouteService } from '../../services/route.service';

@Component({
  selector: 'app-start',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './start.component.html',
  styleUrl: './start.component.scss'
})
export class StartComponent {

  constructor (private router: Router, private routeService: RouteService){
  }

  buttonLabels: string[] = [
    'Über Uns', 
    'Produktbeispiele', 
    'Anfragen', 
    'Kontakt', 
  ];

  buttonClicked(label: string): void {
    if (label === "Über Uns") {
      this.router.navigate(['/about-us'])
    }
    if (label === "Produktbeispiele") {
      this.router.navigate(['/products'])
    }
    if (label === "Anfragen") {
      this.router.navigate(['/requests'])
    }
    if (label === "Kontakt") {
      this.router.navigate(['/contact'])
    }
  }
}
