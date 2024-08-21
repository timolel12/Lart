import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { OrderDialogComponent } from '../../dialogs/order-dialog/order-dialog.component';

@Component({
  selector: 'app-requests',
  standalone: true,
  imports: [MatDividerModule, MatCardModule, MatButtonModule],
  templateUrl: './requests.component.html',
  styleUrl: './requests.component.scss'
})
export class RequestsComponent {
  
  constructor(public dialog: MatDialog){}

  openOrderDialog(){
    let dialog = this.dialog.open(OrderDialogComponent, {
      disableClose: true,
      height: '100vh', 
      width: '100vw',
      maxWidth: '100vw'
    });
  }

}
