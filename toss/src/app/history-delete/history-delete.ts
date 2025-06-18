import { Component } from '@angular/core';
import { deleteAllModel, Myservice } from '../myservice';

@Component({
  selector: 'app-history-delete',
  imports: [],
  templateUrl: './history-delete.html',
  styleUrl: './history-delete.css'
})
export class HistoryDelete {

  data: any;
  deleteAllModel: deleteAllModel = new deleteAllModel();

  constructor(private myservice: Myservice) { }

  deleteAll(phoneNumber: string): void {
    console.log("Deleting history for number:", phoneNumber);
    this.myservice.deleteAll(phoneNumber).subscribe({
      next: (data) => {
        this.data = data.result;
        alert(data.response ?? 'transaction history deleted successfully');
      },
      error: (error) => {
        alert('deletion failed. Please try again.');
      }
    })
  }

  ngOnInit(): void {
    const number = sessionStorage.getItem("number")
    if(number){
      this.deleteAllModel.phoneNumber = number
      this.deleteAll(number);
    }
  }
}
