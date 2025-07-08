import { Routes } from '@angular/router';
import { TemplateForm } from './template-form/template-form';
import { Login } from './login/login';
import { AddMoney } from './add-money/add-money';
import { PaymentMoney } from './payment-money/payment-money';
import { Dashboard } from './dashboard/dashboard';
import { TransactionHistory } from './transaction-history/transaction-history';
import { HistoryDelete } from './history-delete/history-delete';
import { AuthGuard } from './auth-guard';  // 👈 Import the guard

export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'signUpForm', component: TemplateForm },
    { path: 'login', component: Login },
    { path: 'form/:logIn', component: TemplateForm },
    { path: 'addMoney', component: AddMoney, canActivate: [AuthGuard] },
    { path: 'paymentMoney', component: PaymentMoney, canActivate: [AuthGuard] },
    { path: 'dashboard', component: Dashboard, canActivate: [AuthGuard] },
    { path: 'history', component: TransactionHistory, canActivate: [AuthGuard] },
    { path: 'historydeleteAll', component: HistoryDelete, canActivate: [AuthGuard] },
    
];
