import { Component, OnInit } from '@angular/core';
import * as $ from '../../../../node_modules/jquery';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { QuizStorageService } from 'src/app/service/quiz-storage.service';
import { HttpClient } from '@angular/common/http';
import { QuizHttpService } from 'src/app/service/quiz-http.service';
//const axios = require('axios').default;

import axios from 'axios';
import { SweetAlertService } from 'src/app/common/sweetalert2.service';

@Component({
  selector: 'app-home-admin',
  templateUrl: './home-admin.component.html',
  styleUrls: ['./home-admin.component.css']
})
export class HomeAdminComponent implements OnInit {

  
  loginModel : any = {
    email : '',
    phone : '', 
    password: '',
    code : '',
    error : ''
  }

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
    private storageService : QuizStorageService, private http:HttpClient,  private quizHttpService: QuizHttpService, private alertService: SweetAlertService,) { }


  ngOnInit() {
    this.initForm()

  }
  PageLogin(){
    this.router.navigate(['/home']);
  }
  initForm() {
    // this.loginForm = this.fb.group({
    //   emailID: ['', [Validators.required]],
    //   password: ['', [Validators.required]]
    // });
  }




  login(){
   
    const reqMap = {
      "email":this.loginModel.email,
      "password":this.loginModel.password
  }

  console.log(this.loginModel);
  if(this.loginModel.email!=''){
    if(this.loginModel.password!=''){
      this.loginModel.error="";
      axios.post('http://env-9498608.cloudjiffy.net/api/auth/login', reqMap)
      .then((res) => {
            if(res.data.code==200){
    this.alertService.swalSuccess("Sucessfully Login!");
    
        this.storageService.set('token',res.data.token);
        this.storageService.set('currentUser', res.data.auth);

      console.log(this.storageService.get('token'), 'see token');
         this.storageService.set('userEmail',res.data.email);


            this.loginModel.email='';
            this.loginModel.password='';
                this.router.navigate(['admin/dashboard']);


            }else if(res.data.code!=200){
              this.alertService.swalError("**Email & password not matched**");
            }

      
      })
      .catch(function (error) {
        console.log(error);
      });
    }else{
      this.loginModel.error = ' ** Password Required! **';
    }

  }else{
    this.loginModel.error = ' ** Email Required! **';
  }
        


console.log(this.loginModel);

}
 
}
