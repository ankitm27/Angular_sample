  import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {FormGroup, FormBuilder, Validators, FormControl, NgForm} from '@angular/forms';
import { Route } from '@angular/compiler/src/core';
import * as $ from '../../../../node_modules/jquery';
import { QuizStorageService } from 'src/app/service/quiz-storage.service';
import { SweetAlertService } from 'src/app/common/sweetalert2.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  status = 0;
  userList = [
    {
      id: 'admin',
      password: 12345
    },
    {
      id: 'user',
      password: 12345
    }
  ];
public loginForm: FormGroup
  constructor(private router: Router, private route: Router, private fb: FormBuilder,
    private storageService : QuizStorageService,private sweetAlert: SweetAlertService) { }

  ngOnInit() {
    this.initForm();
  }
  initForm() {
    this.loginForm = this.fb.group({
      emailID: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }
login(regFrom){
console.log(this.loginForm.value.password)
  if(this.loginForm.value.emailID=="admin" && this.loginForm.value.password=="12345")
  {
    this.router.navigate(['admin/dashboard']);
    this.sweetAlert.swalSuccess('hii');
  }
  else if (this.loginForm.value.emailID=="user" && this.loginForm.value.password=="12345") {
    this.router.navigate(['client/dashboard']);

  }
  else{
    this.sweetAlert.swalError('Wrong Password')

  }

         

  // if (this.loginForm.valid) {
  //   const reqMap = {
  //     emailID: this.loginForm.value.emailID,
  //     password: this.loginForm.value.password
  //       };
  //       console.log("data",reqMap);
  //       const usr = this.userList.filter(usr => usr.id == this.loginForm.controls.emailID.value);
  //       const pass = this.userList.filter(pass => pass.password == this.loginForm.controls.password.value);
  //       if (usr.length > 0) {
  //         if (usr[0].id == 'admin' && pass[0].password == 12345) {
  //           this.storageService.set('currentUser',reqMap);

  //           this.router.navigate(['admin/dashboard']);
  //           console.log("if working");
    
  //         } else if (usr[0].id == 'user' && pass[0].password == 12345) {
  //           this.router.navigate(['client/instruction']);
  //           this.storageService.set('currentUser',reqMap);

  //           console.log("else working");
  //         }

  //       }  
  //       }

}
PageLogin(){
  this.router.navigate(['/login'])
}
forgetPassword(){
  this.status = 1;
}
forgetPassword2(){
  this.status = 0;
}
LoginPage(){
  console.log("dsdsdsdsd");
  $('.login').show();
  $('.signup').hide();

}
signup(){
  $('.login').hide();
  $('.signup').show(); 
}
logout(){
  this.router.navigate(['/home']);
}
}
