import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AddMoneyModel, Myservice } from '../myservice';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-money',
  imports: [CommonModule, FormsModule],
  templateUrl: './add-money.html',
  styleUrl: './add-money.css'
})
export class AddMoney {
Amount= '';
data: any;
userPhonenumber: string | null | undefined;


constructor(private myservice: Myservice, public router: Router){}


AddMoney(Amount: any): void {
  if(Amount==null || Amount==undefined || Amount<=0){
    console.log('invalid amount');
    return;
  }
  console.log('Added money: ', Amount);

  const model = new AddMoneyModel();
  model.amount = Amount;
  model.phoneNumber = this.userPhonenumber ?? '';


  this.myservice.AddMoney(model).subscribe(data=>{
    this.data = data.result?? null;
    alert(data.response?? 'operation completed!');
    this.router.navigate(["/dashboard"]);
  })

}

ngOnInit(): void{
  this.userPhonenumber = sessionStorage.getItem("number");
}
}

