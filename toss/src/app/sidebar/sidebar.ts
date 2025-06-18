import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  imports: [],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css'
})
export class Sidebar {
constructor(private router: Router){}

@Output() logicEvent = new EventEmitter<string>();
logout()
{
  sessionStorage.removeItem('number');
  sessionStorage.removeItem('isloggedin')
  this.router.navigate(['/login']);
  this.send(false);
}

send(val:any){
  this.logicEvent.emit(val);
}
}
