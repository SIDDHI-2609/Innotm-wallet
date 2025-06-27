import { Routes } from '@angular/router';
import { TemplateForm } from './template-form/template-form';
import { Login } from './login/login';
import { AddMoney } from './add-money/add-money';
import { PaymentMoney } from './payment-money/payment-money';
import { Dashboard } from './dashboard/dashboard';
import { TransactionHistory } from './transaction-history/transaction-history';
import { HistoryDelete } from './history-delete/history-delete';
import { Adminlogin } from './adminlogin/adminlogin';
import { AdminDashboard } from './admin-dashboard/admin-dashboard';

export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'signUpForm', component: TemplateForm },
    { path: 'login', component: Login },
    { path: 'form/:logIn', component: TemplateForm },
    { path: 'addMoney', component: AddMoney },
    { path: 'paymentMoney', component: PaymentMoney },
    { path: 'dashboard', component: Dashboard },
    { path: 'history', component: TransactionHistory },
    { path: 'historydeleteAll', component: HistoryDelete },
    // { path: 'historydeletebyId', component: DeleteById },
    { path: 'admin-login', component: Adminlogin },
    { path: 'admin-dashboard', component: AdminDashboard }
];
