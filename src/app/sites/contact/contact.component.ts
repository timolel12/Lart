import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button'
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, MatDividerModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent {

  openInstagram(){
    window.open('https://www.instagram.com/l.art_handmade/', '_blank');
  }
}
