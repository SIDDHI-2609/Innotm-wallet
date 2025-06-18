import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Myservice {

  constructor(private http: HttpClient) { }

  url = 'https://skytm-api.azurewebsites.net'

  getDataBySignUp(data: signupModel): Observable<any> {
    return this.http.post<any>(this.url + '/api/Auth/signup', data)
  }

  getDataByLogIn(data: loginModel): Observable<any> {
    return this.http.post<any>(this.url + '/api/Auth/login', data)
  }

  AddMoney(data: AddMoneyModel): Observable<any> {
    return this.http.post<any>(this.url + '/api/Wallet/add', data)
  }

  paymentMoney(data: payModel): Observable<any> {
    return this.http.post<any>(this.url + '/api/Transactions/pay', data)
  }

  getTransactionHistory(data: any): Observable<any> {
    return this.http.get<any>(`${this.url}/api/Transactions/history?phoneNumber=`+data);

  }

  showMoney(data: any): Observable<any> {
    console.log(data, 'service data')
    return this.http.get<any>(this.url + "/api/Users/balance?phoneNumber=" + data);
  }

  getusers(): Observable<any> {
    return this.http.get<any>(`${this.url}/api/Users/basic-list`);
  }

  deleteAll(phoneNumber: any): Observable<any> {
    console.log(`Attempting to delete transaction with ID: ${phoneNumber}`);
    return this.http.delete<any>(this.url + '/api/Transactions/history?phoneNumber=' + phoneNumber);
  }

  deleteById(tid:number): Observable<any>{
    return this.http.delete<any>(this.url +'/api/Transactions/DeleteTransectionById?tid='+tid);
  }
}

export class signupModel {

  email: string | undefined;
  phoneNumber: string | undefined;
  gender: string | undefined;
  userName: string | undefined;
  password: string | undefined;

}

export class loginModel {
  phoneNumber: string | undefined;
  password: string | undefined;
}

export class AddMoneyModel {
  amount: number | undefined;
  phoneNumber: string | undefined;

}

export class payModel {
  senderPhoneNumber!: string;
  receiverPhoneNumber!: string;
  amount: number | undefined;
}

export class historyModel {
  phoneNumber!: string ;
}

export class walletModel {
  phoneNumber!: string;
}

export class deleteAllModel {
  phoneNumber: string | undefined;
  // number: string | undefined;
}

export class deleteByIdModel{
  tid: Number | undefined;
}