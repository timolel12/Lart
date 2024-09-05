import { Component } from '@angular/core';
import { MatCommonModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'

@Component({
  selector: 'app-progress',
  standalone: true,
  imports: [
    MatDialogModule,
    MatCommonModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './loading-dialog.component.html',
  styleUrls: ['./loading-dialog.component.scss']
})
export class LoadingDialogComponent { 
}
