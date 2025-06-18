import { Component } from '@angular/core';
import { Myservice, walletModel } from '../myservice';


@Component({
  selector: 'app-dashboard',
  imports: [],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard {
  amount : number | undefined;
  userPhonenumber: string | null | undefined;

constructor(private myservice: Myservice){}

walletMoney(): void{
this.myservice.showMoney(this.userPhonenumber).subscribe(data=>{
  console.log(this.amount);
  this.amount = data.result.amount;
})
}

ngOnInit():void{

  this.userPhonenumber= sessionStorage.getItem("number")
  // this.userPhone = JSON.stringify (sessionStorage.getItem("number"));
  console.log(sessionStorage.getItem('number'))
  this.walletMoney();
}
}
