import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as $ from '../../../../../../node_modules/jquery';
import axios from 'axios';
import { QuizStorageService } from 'src/app/service/quiz-storage.service';
import { HttpClient } from '@angular/common/http';
import { QuizHttpService } from 'src/app/service/quiz-http.service';
import { SweetAlertService } from 'src/app/common/sweetalert2.service';

@Component({
  selector: 'app-submit',
  templateUrl: './submit.component.html',
  styleUrls: ['./submit.component.css']
})
export class SubmitComponent implements OnInit {
  mailModel: any = {
    email: '',

  }
  clicked = true;
  reportData:any = [];
  emailId = this.storageService.get('userEmail');
  tokenValue = this.storageService.get('userToken');

  result = this.storageService.get('submitResponse');
  security=this.storageService.get('security');

  public loginForm: FormGroup
  constructor(private router: Router, private route: Router, private fb: FormBuilder,
    private storageService: QuizStorageService, private http: HttpClient, private quizHttpService: QuizHttpService, private alertService: SweetAlertService, ) { }



  confirm() {
    for (let res of this.result) {
      this.reportData.push({
        'correct_answer': res.correct_answer,
        'wrong_answer': res.wrong_answer,
        'unsubmit_answer': res.unsubmit_answer,
      })

    }
    console.log(this.reportData,'dssfdf')
  }
  ngOnInit() {
    this.confirm();
  }
  logout() {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('userToken');
    this.router.navigate(['/home']);
    localStorage.removeItem('userEmail');
  }
  login() {

    const reqMap = {
      "email": this.emailId,
      "security": this.security,
      "receiver": this.mailModel.email,
      "correct_answer": this.reportData[0].correct_answer,
      "wrong_answer": this.reportData[0].wrong_answer, 
      "unsubmit_answer": this.reportData[0].unsubmit_answer
    }
     console.log(reqMap)

    axios.post('http://env-9498608.cloudjiffy.net/api/user/send_report', reqMap,{ headers: { "token": ` ${this.tokenValue}` } })
      .then((res) => {
        if (res.data.code == 200) {
          this.alertService.swalSuccess("Mail Sent Successfully");
        window.location.href="https://www.accaglobal.com/in/en.html"
        } else if (res.data.code != 200) {
          this.alertService.swalError("Something went wrong");
          // window.location.href="https://www.accaglobal.com/in/en.html"
          localStorage.removeItem('currentUser');
          localStorage.removeItem('userToken');
          this.router.navigate(['/home']);
          localStorage.removeItem('userEmail');
        }


      })
      .catch(function (error) {
        console.log(error);
      });

  }
//  login(){
//   this.alertService.swalSuccess("Mail Sent Successfully");
//       window.location.href="https://www.accaglobal.com/in/en.html"
//  }

}
