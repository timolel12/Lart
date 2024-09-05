import { Component, Input  } from '@angular/core';
import { FormBuilder, FormGroup, AbstractControl, Validators, ValidationErrors, ValidatorFn } from '@angular/forms';
import { Order} from '../../models/order.model';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { ReactiveFormsModule } from '@angular/forms';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip' 
import { CommonModule } from '@angular/common';
import { EmailService } from '../../services/email.service';
import { LoadingDialogComponent } from '../loading-dialog/loading-dialog.component';
import { GenericDialogComponent } from '../generic-dialog/generic-dialog.component';

@Component({
  selector: 'app-order-dialog',
  standalone: true,
  imports: [
    MatSelectModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    MatCardModule,
    MatOptionModule,
    MatIconModule,
    MatTooltipModule,
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './order-dialog.component.html',
  styleUrl: './order-dialog.component.scss'
})
export class OrderDialogComponent {
  orderForm: FormGroup;

  @Input() selectedProductId!: number | null;  // Input to receive the selected product ID

  products = [
    { id: 1, name: 'Farb Gemälde' },
    { id: 2, name: 'Stick Gemälde' },
    { id: 3, name: 'Sonstige Anfrage' },
  ];

  constructor(private formBuilder: FormBuilder,
              private emailService: EmailService,
              public dialog: MatDialog,
              public dialogRef: MatDialogRef<OrderDialogComponent>) {

    this.orderForm = this.formBuilder.group({
      product: [null, Validators.required],
      customerSurname: ['', Validators.required],
      customerName: ['', Validators.required],
      customerEmail: ['', [Validators.required, Validators.email]],
      customerOrderText: ['', [this.onlyLettersAndNumbersValidator()]],
    });
  }

  ngOnInit() {
    if (this.selectedProductId !== null && this.selectedProductId !== undefined) {
      this.orderForm.patchValue({
        productId: this.selectedProductId,
      });
    }
  }

 // Custom validator function to allow only letters and numbers
 onlyLettersAndNumbersValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!control.value) {
      // Handle empty value
      return null;
    }
    
    const regex = /^[a-zA-ZäöüÄÖÜß0-9\s.,;:!?-]*$/;
    const valid = regex.test(control.value);
    return valid ? null : { 'invalidChars': true };
  };
}

  get f() {
    return this.orderForm.controls;  
  }

  sendRequest() {
    console.log('Submit');

    if (this.orderForm.invalid) {
      return;
    }

    let loadingDialog = this.dialog.open(LoadingDialogComponent, {
      panelClass: "transparent-dialog"
    });

    const orderData: Order = this.orderForm.value;

    console.log(orderData);

    console.log('Try send');
    this.emailService.sendEmail(orderData)
      .then(response => {
        // sending email success
        loadingDialog.close()

        console.log('Email sent successfully!', response.status, response.text);

        const successDialog = this.dialog.open(GenericDialogComponent, {
          data: { type: "success", message: "Anfrage verschickt" },
          disableClose: true,
          width: '400px', 
          height: 'auto', 
          maxWidth: '90vw',
          maxHeight: '90vh',
          position: { top: '50%', left: '50%' }, // Ensure the dialog is centered
        });

        setTimeout(() => {
          successDialog.close();
        }, 5000);
      }, error => {
        // sending email failed
        loadingDialog.close()

        console.error('Failed to send email:', error);

        const failureDialog = this.dialog.open(GenericDialogComponent, {
          data: { type: "success", message: "Anfrage verschickt" },
          disableClose: true,
          width: '400px', 
          height: 'auto', 
          maxWidth: '90vw',
          maxHeight: '90vh',
        });

        setTimeout(() => {
          failureDialog.close();
        }, 5000);
        
      });
  }

  closeDialog(){
    this.dialogRef.close();
  }
}
