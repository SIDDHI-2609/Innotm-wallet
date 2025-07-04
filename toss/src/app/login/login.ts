import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { loginModel, Myservice } from '../myservice';
import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule, RouterLink],
  providers: [Myservice],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {

  // loginModel: any={};
  data: any;

  loginModel: loginModel = new loginModel();
  admin: any;

  constructor(private myservice: Myservice, public router: Router) { }

  ngOnInit(): void {
    if (Boolean(sessionStorage.getItem("isloggedin"))) {
      this.router.navigate(['/dashboard']);
    }
  }

  @Output() logicEvent = new EventEmitter<string>();

  send(val: any) {
    this.logicEvent.emit(val);
  }

  // submitted = false;
  onLoginSubmit() {
    // alert('success!! :-) \n\n' + JSON.stringify(this.loginModel))

    this.myservice.getDataByLogIn(this.loginModel).subscribe(data => {
      this.data = data.result
      alert(data.response);
      if (data.response == 'login successfully') {
        this.send(true);
        sessionStorage.setItem("isloggedin", "true");
        sessionStorage.setItem("number", this.data.phoneNumber)
  //           if (this.data.result.is === 'admin' && this.admin.password === 'admin123') {
  //   this.router.navigate(['/admin-dashboard']);
  // } else {
  //   alert('Invalid Admin Credentials');
  // }
        this.router.navigate(['/dashboard']);
       
      }
      else{
        this.send(false);
      }
    })



  }

  goToSignUp() {
    this.router.navigate(['/signUpForm']);
  }


}
