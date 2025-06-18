import { Component } from '@angular/core';
import { deleteByIdModel, Myservice } from '../myservice';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-delete-by-id',
  imports: [CommonModule, FormsModule],
  templateUrl: './delete-by-id.html',
  styleUrl: './delete-by-id.css'
})
export class DeleteById {
data: any;
deleteByIdModel: deleteByIdModel = new deleteByIdModel();

constructor(private myservice: Myservice){}

deleteById(tid: number): void{
  this.myservice.deleteById(tid).subscribe({
    next: (data) => {
      this.data= data?.result?? null;
      alert(data.response?? 'trasaction id deleted successfully');
    },
    error: (err) => {
      alert('deletion failed. Please try again.');
    }
  })
}
ngOnInit(): void {
    const phone = sessionStorage.getItem("number")
    if(phone){
      const tid = Number(phone);
    if (tid) {
      this.deleteByIdModel.tid = tid;
      this.deleteById(tid);
    }
    }
  }
}
