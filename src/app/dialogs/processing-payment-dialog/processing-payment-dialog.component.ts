import { Component } from '@angular/core';
import { MatCommonModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-progress',
  standalone: true,
  imports: [MatDialogModule, MatCommonModule, MatProgressSpinnerModule],
  templateUrl: './processing-payment-dialog.component.html',
  styleUrls: ['./processing-payment-dialog.component.scss'],
})
export class ProcessingPaymentDialogComponent {}
