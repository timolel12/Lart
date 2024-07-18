import { Component, Input  } from '@angular/core';
import { FormBuilder, FormGroup, AbstractControl, Validators, ValidationErrors, ValidatorFn } from '@angular/forms';
import { Order, Product } from '../../models/order.model';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { ReactiveFormsModule } from '@angular/forms';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogRef } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip' 
import { CommonModule } from '@angular/common';

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
  submitted = false;

  @Input() selectedProductId!: number | null;  // Input to receive the selected product ID

  products: Product[] = [
    { id: 1, name: 'Farb Gemälde' },
    { id: 2, name: 'Stick Gemälde' },
    { id: 3, name: 'Sonstige Anfrage' },
  ];

  constructor(private formBuilder: FormBuilder,
              public dialogRef: MatDialogRef<OrderDialogComponent>) {

    this.orderForm = this.formBuilder.group({
      productId: [null, Validators.required],
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
    
    const regex = /^[a-zA-Z0-9]+$/; // Regular expression for letters and numbers only
    const valid = regex.test(control.value);
    return valid ? null : { 'invalidChars': true };
  };
}

  get f() {
    return this.orderForm.controls;  
  }

  onSubmit() {
    this.submitted = true;

    if (this.orderForm.invalid) {
      return;
    }

    // Process the order - Example: send to server, etc.
    const orderData: Order = this.orderForm.value;
    console.log(orderData);
  }

  closeDialog(){
    this.dialogRef.close();
  }

  

}
