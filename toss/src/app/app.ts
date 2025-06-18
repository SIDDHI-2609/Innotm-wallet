import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Myservice } from './myservice';
import { FormsModule } from '@angular/forms';
import { TemplateForm } from './template-form/template-form';
import { Login } from './login/login';
import { AddMoney } from './add-money/add-money';
import { PaymentMoney } from './payment-money/payment-money';
import { Dashboard } from './dashboard/dashboard';
import { Sidebar } from './sidebar/sidebar';
import { HistoryDelete } from './history-delete/history-delete';
import { DeleteById } from './delete-by-id/delete-by-id';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule, FormsModule, RouterLink, Login, AddMoney, PaymentMoney, Dashboard, Sidebar, HistoryDelete, DeleteById],
  providers: [Myservice],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected title = 'toss';
  isloggedin=false;
  ngOnInit(): void{
    this.isloggedin=Boolean(sessionStorage.getItem("isloggedin"))
  }

  received(event:any){
    this.isloggedin=event;
  }
}
