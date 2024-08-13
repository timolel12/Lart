import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button'
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-about-us',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, MatDividerModule],
  templateUrl: './about-us-back.component.html',
  styleUrl: './about-us-back.component.scss'
})
export class AboutUsBackComponent {

}
