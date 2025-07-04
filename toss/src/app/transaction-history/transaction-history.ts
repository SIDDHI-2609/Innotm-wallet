import { Component } from '@angular/core';
import { historyModel, Myservice } from '../myservice';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { Router } from '@angular/router';

@Component({
  selector: 'app-transaction-history',
  standalone: true,
  imports: [CommonModule, FormsModule, TableModule],
  templateUrl: './transaction-history.html',
  styleUrl: './transaction-history.css'
})


export class TransactionHistory {
  data1: any = null;
  data: any = null;
  data2: any = null;
  historyModel: historyModel = new historyModel();
  userphoneNumber: any;
  constructor(private myservice: Myservice, private router: Router) { }

  seeTransaction(): void {

    this.historyModel.phoneNumber = this.userphoneNumber;

    console.log('transaction history', this.historyModel)

    this.myservice.getTransactionHistory(this.userphoneNumber).subscribe({
      next: (data) => {
        console.log('API raw data', data);
        this.data1 = data?.result ?? data;
        // alert(data?.response ?? 'Transaction history fetched!');
      },

      error: (err) => {
        console.error('Error fetching transaction history:', err);
        alert('Something went wrong!');
      }
    });
  }

  ngOnInit(): void {

    // this.userphoneNumber = sessionStorage.getItem("number");
    // this.seeTransaction();


    this.userphoneNumber = sessionStorage.getItem("number");
    if (this.userphoneNumber) {
      this.seeTransaction(); // ✅ Only fetch transaction history
    } else {
      alert('Phone number not found.');
    }
  }



  deletehistoryById(transactionId: any) {
    this.myservice.deleteById(transactionId).subscribe(data => {
      this.data = data.result;
      this.seeTransaction();
      alert('transaction history deleted successfully!!');
    })


  }

  confirmDeleteAll(): void {
  const confirmDelete = confirm("Are you sure you want to delete all transactions?");
  if (confirmDelete && this.userphoneNumber) {
    this.deleteAll(this.userphoneNumber);
  }
}



  deleteAll(phoneNumber: string): void {
    
    this.myservice.deleteAll(phoneNumber).subscribe(data2 => {
      this.data2 = data2.result;
      this.seeTransaction();
      alert(data2.response ?? 'transaction history deleted successfully');
      this.router.navigate(["/dashboard"]);
    }
      
    )
  }

  
}


