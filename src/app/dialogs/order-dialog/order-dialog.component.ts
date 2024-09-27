import { Component, Input, ViewContainerRef  } from '@angular/core';
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

  showOrderForm = true;
  showSuccessMessage = false;
  showErrorMessage = false;
  orderForm: FormGroup;

  @Input() selectedProductId!: number | null;

  products = [
    { id: 1, name: 'Haarreif' },
    { id: 2, name: 'Stick Gemälde' },
    { id: 3, name: 'Gipsfigur' },
    { id: 4, name: 'Blumenstrauß (mit Flasche nach Wahl)' },
    { id: 5, name: 'Bilder mit Zeitungsformen (3D)' },
    { id: 7, name: 'Sonstige Anfrage' },
  ];

  constructor(private formBuilder: FormBuilder,
              private emailService: EmailService,
              private viewContainerRef: ViewContainerRef,
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
    if (this.orderForm.invalid) {
      return;
    }

    let loadingDialog = this.dialog.open(LoadingDialogComponent, {
      panelClass: "transparent-dialog",
      width: '100vw',
      height: '100vh',
      maxWidth: 'none',
      maxHeight: 'none',
      disableClose: true
    });

    const orderData: Order = this.orderForm.value;

    this.emailService.sendEmail(orderData)
      .then(response => {
        // sending email success
        this.showOrderForm = false;
        this.showSuccessMessage = true;

        loadingDialog.close()

        setTimeout(() => {
         this.closeDialog();
        }, 5000);

      }, error => {
        // sending email failed
        loadingDialog.close()

        setTimeout(() => {
          this.closeDialog();
         }, 5000);
        
      });
  }

  closeDialog(){
    this.dialogRef.close();
  }
}
