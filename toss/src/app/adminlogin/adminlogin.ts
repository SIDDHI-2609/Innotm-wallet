import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-adminlogin',
  imports: [CommonModule, FormsModule],
  templateUrl: './adminlogin.html',
  styleUrl: './adminlogin.css'
})
export class Adminlogin {
// admin-login.component.ts
admin = { username: '', password: '' };

constructor(private router: Router){}

login() {
  if (this.admin.username === 'admin' && this.admin.password === 'admin123') {
    this.router.navigate(['/admin-dashboard']);
  } else {
    alert('Invalid Admin Credentials');
  }
}

}
