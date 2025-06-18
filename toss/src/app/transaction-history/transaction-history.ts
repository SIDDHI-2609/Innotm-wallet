import { Component } from '@angular/core';
import { historyModel, Myservice } from '../myservice';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';

@Component({
  selector: 'app-transaction-history',
  standalone: true,
  imports: [CommonModule, FormsModule, TableModule],
  templateUrl: './transaction-history.html',
  styleUrl: './transaction-history.css'
})


export class TransactionHistory {
  data: any = null;
  historyModel: historyModel = new historyModel();
  userphoneNumber: any;
  constructor(private myservice: Myservice) { }

  seeTransaction(): void {

    this.historyModel.phoneNumber = this.userphoneNumber;

    console.log('transaction history', this.historyModel)

    this.myservice.getTransactionHistory(this.userphoneNumber).subscribe({
      next: (data) => {
        console.log('API raw data', data);
        this.data = data?.result ?? data;
        // alert(data?.response ?? 'Transaction history fetched!');
      },

      error: (err) => {
        console.error('Error fetching transaction history:', err);
        alert('Something went wrong!');
      }
    });
  }

  ngOnInit(): void {

    this.userphoneNumber = sessionStorage.getItem("number");
    this.seeTransaction();
  }

  deletehistoryById(transactionId: any) {
    this.myservice.deleteById(transactionId).subscribe(data => {
      this.data = data.result;
      alert('transaction history deleted successfully!!');
    })


  }
}
