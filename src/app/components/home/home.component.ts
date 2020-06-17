import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as $ from '../../../../node_modules/jquery';
import { QuizStorageService } from 'src/app/service/quiz-storage.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import axios from 'axios';
import Swal from 'sweetalert2';
import { CustomValidators } from 'src/app/validator/custom-validator';
import { SweetAlertService } from 'src/app/common/sweetalert2.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  dataResponse: any = [];

  loginModel: any = {
    email: '',
    password: '',
    phone_no: '',
    code: '',
    error: ''
  }

  status = 0;

  public loginForm: FormGroup
  constructor(private router: Router, private route: Router, private fb: FormBuilder,
    private storageService: QuizStorageService, private sweetAlert: SweetAlertService) { }

  ngOnInit() {
    this.initForm();
 
  }
  initForm() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.pattern(/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/)]],
      password: ['', [Validators.required]],
      phone_no: ['', [Validators.required,Validators.pattern(/^(?:(?:\+|0{0,2})91(\s*[\ -]\s*)?|[0]?)?[789]\d{9}|(\d[ -]?){10}\d$/)]],
      security: ['', [Validators.required ]]
    });
  }
  login() {

    const reqMap = {
      // "email": this.loginModel.email,
      // "password": this.loginModel.password,
      // "phone_no": this.loginModel.phone_no,
      // "security": this.loginModel.security,
      ...this.loginForm.value
    };
    if(this.loginForm.valid){
    console.log(reqMap, 'data');
    if(this.loginModel.email!=''|| this.loginModel.password !='' || this.loginModel.phone_no !=''
    || this.loginModel.security !=''){
    axios.post('http://env-9498608.cloudjiffy.net/api/user/user', reqMap)
      .then((response) => {
 
        if (response.data.code == 200) {
          this.dataResponse = response.data;
          this.storageService.set('userResponse', this.dataResponse);
          this.storageService.set('userToken', response.data.token);
          this.storageService.set('userEmail', response.data.email);
          this.storageService.set('userPhone', response.data.phone_no);
          this.storageService.set('security', response.data.security);
          this.sweetAlert.swalSuccess('Login Successfully')
          this.loginForm.reset();
          this.router.navigate(['client/instruction']);
        } else if (response.data.code != 200) {
          this.sweetAlert.swalError(response.data.error)

        }
        // else if (response.data.code == 400) {
        //   this.sweetAlert.swalError(response.data.failed)

        // }
      })
      .catch(function (error) {
        console.log(error);
      });
    }else{
      this.loginModel.error = ' ** All fields Required! **';
    }
  } else{
    CustomValidators.validateAllFormFields(this.loginForm);

  }
  } 

    





  open() {
    $('#mySidebar').show();
  }

  close() {
    $('#mySidebar').hide();
  }
  logout() {
    this.router.navigate(['/home']);

  }
  PageLogin() {
    this.router.navigate(['/homeAdmin'])
  }
}
