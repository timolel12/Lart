import { CommonModule } from '@angular/common';
import { Component, Inject  } from '@angular/core';
import { MatCommonModule } from '@angular/material/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { BrowserModule } from '@angular/platform-browser';

@Component({
  selector: 'app-generic-dialog',
  standalone: true,
  imports: [MatIconModule,
            MatCommonModule,
            MatDialogModule,
            BrowserModule,
            CommonModule
  ],
  templateUrl: './generic-dialog.component.html',
  styleUrl: './generic-dialog.component.scss'
})
export class GenericDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<GenericDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { type: 'success' | 'failure'; message: string }
  ) {}

  onClose(): void {
    this.dialogRef.close();
  }
}
