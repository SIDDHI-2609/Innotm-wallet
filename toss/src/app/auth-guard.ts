import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(): boolean {
    const isLoggedIn = sessionStorage.getItem("isloggedin") === "true";

    if (isLoggedIn) {
      return true;
    } else {
      alert("Please login first!");
      this.router.navigate(['/login']);
      return false;
    }
  }
}

