import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list'
import { MatCardModule } from '@angular/material/card';


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatToolbarModule, MatListModule, MatCardModule],
  templateUrl: './app-header.component.html',
  styleUrl: './app-header.component.scss'
})
export class AppHeaderComponent {

  activeLink: string = 'home';

  constructor(private router: Router)  {

  }

  navigateContact(){
    this.activeLink = 'contact';
    this.router.navigate(['/contact'])
  }
  navigateAboutUs(){
    this.activeLink = 'about-us';
    this.router.navigate(['/about-us'])
  }
  navigateHome(){
    this.activeLink = 'home';
    this.router.navigate(['/home'])
  }
}
