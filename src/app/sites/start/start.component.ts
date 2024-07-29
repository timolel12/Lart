import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-start',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './start.component.html',
  styleUrl: './start.component.scss'
})
export class StartComponent {

  buttonLabels: string[] = [
    'Über Uns', 
    'Produktbeispiele', 
    'Anfragen', 
    'Kontakt', 
    'Impressum', 
    'Datenschutz'
  ];

  buttonClicked(label: string): void {
    alert(`${label} button clicked!`);
  }
}
