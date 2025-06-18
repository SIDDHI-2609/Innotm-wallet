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
      if (data.response == 'Login Successfully !!') {
        this.send(true);
        sessionStorage.setItem("isloggedin", "true");
        this.router.navigate(['/dashboard']);
        sessionStorage.setItem("number", this.data.phoneNumber)
      }
      else{
        this.send(false);
      }
    })

  }

  



}
