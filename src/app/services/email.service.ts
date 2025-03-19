import { Injectable } from '@angular/core';
import { Order } from '../models/order.model';
import emailjs, { EmailJSResponseStatus } from 'emailjs-com';

@Injectable({
  providedIn: 'root',
})
export class EmailService {
  private userID = 'RjCX3b2zXq-6l0cdX'; // EmailJS User ID or public key
  private serviceID = 'lart_email_service'; // EmailJS Service ID
  private templateID = 'template_pypc6aq'; // EmailJS Template ID

  constructor() {
    emailjs.init(this.userID);
  }

  sendEmail(orderData: Order): Promise<EmailJSResponseStatus> {
    return emailjs.send(this.serviceID, this.templateID, {
      from_surname: orderData.customerSurname,
      from_name: orderData.customerName,
      product: orderData.product,
      message: orderData.customerOrderText,
      reply_to: orderData.customerEmail,
    });
  }
}
