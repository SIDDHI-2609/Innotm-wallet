import { Component } from '@angular/core';
import { Myservice } from '../myservice';

@Component({
  selector: 'app-admin-dashboard',
  imports: [],
  templateUrl: './admin-dashboard.html',
  styleUrl: './admin-dashboard.css'
})
export class AdminDashboard {
totalUsers = 0;
totalBalance = 0;
data: any;
users: any[] = [];

constructor(private myservice: Myservice){}

ngOnInit() {
  this.getAdminStats();
  this.getAllUsers();
}

getAdminStats() {
  this.myservice.getAdminStats().subscribe((data) => {
    this.totalUsers = data.totalUsers;
    this.totalBalance = data.totalBalance;
  });
}

getAllUsers() {
  this.myservice.getAllUsers().subscribe((data: any[]) => {
    this.users = data;
  });
}

}
