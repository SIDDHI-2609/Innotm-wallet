import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Myservice, payModel } from '../myservice';
import { Router } from '@angular/router';

@Component({
  selector: 'app-payment-money',
  imports: [CommonModule, FormsModule],
  templateUrl: './payment-money.html',
  styleUrl: './payment-money.css'
})
export class PaymentMoney {
  amount: number = 0;

  data: any;
  payModel: payModel = new payModel();
  userPhonenumber: any;
  userList: any;

  constructor(private myservice: Myservice, public router: Router) { }

  SendMoney():void  {
    this.payModel.senderPhoneNumber = this.userPhonenumber;
    console.log('sending money with : ', this.payModel);


    if (!this.payModel.senderPhoneNumber || !this.payModel.receiverPhoneNumber) {
      alert('Both sender and receiver phone numbers are required.');
      return;
    }

    if (!this.payModel.amount || this.payModel.amount <= 0) {
      alert('Please enter a valid amount greater than 0.');
      return;
    }

    this.paymentMoney();
  }


  paymentMoney(): void {

    this.myservice.paymentMoney(this.payModel).subscribe({
      next: (data) => {
        this.data = data.result ?? null;
        alert(data.response ?? 'payment completed successfully!');
        this.router.navigate(["/dashboard"]);
      },
      error: (error) => {
        console.error('Error sending payment:', error);
        alert('Payment failed. Please check your inputs and try again.');
      }
    });
  }

  getallusers() {
    this.myservice.getusers().subscribe(data => {
      this.userList = data.result
    })
  }


  ngOnInit(): void {
    this.userPhonenumber = sessionStorage.getItem("number")
    this.getallusers()
  }
}
