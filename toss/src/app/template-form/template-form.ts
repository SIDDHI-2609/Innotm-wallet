import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Myservice, signupModel } from '../myservice';

@Component({
  selector: 'app-template-form',
  imports: [CommonModule, FormsModule, RouterLink],
  providers: [Myservice],
  templateUrl: './template-form.html',
  styleUrl: './template-form.css'
})
export class TemplateForm {
title= 'angularProject';

constructor(private myservice: Myservice){}

// SignupModel: any ={};
data: any;

signupModel: signupModel = new signupModel();



onSubmit(){
  alert('success!! :-) \n\n' + JSON.stringify(this.signupModel))

  this.myservice.getDataBySignUp(this.signupModel).subscribe(data=>{
    this.data= data.result
    alert(data.response);
    // this.showSignup=false;
  })
}

}
