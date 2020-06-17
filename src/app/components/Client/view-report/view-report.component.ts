import { Component, OnInit } from '@angular/core';
import { QuizStorageService } from 'src/app/service/quiz-storage.service';
import { Router } from '@angular/router';
import axios from 'axios';

@Component({
  selector: 'app-view-report',
  templateUrl: './view-report.component.html',
  styleUrls: ['./view-report.component.css']
})
export class ViewReportComponent implements OnInit {
  status = 0;
  emailId = this.storageService.get('userEmail');
  phoneNo=this.storageService.get('userPhone');
  result = this.storageService.get('submitResponse');
  constructor(private storageService: QuizStorageService, private router: Router) { }
  loggedInUserDetails: any;
  tokenValue = this.storageService.get('userToken');
  token = 'X-Restli-Protocol-Version: 2.0.0'
  ngOnInit() {
    //this.linkedin();
    console.log(this.phoneNo)
  }
  Results() {
    this.status = 1;
  }
  logout() {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('userToken');
    this.router.navigate(['/home']);
    localStorage.removeItem('userEmail');
  }
  sendMail() {
    this.router.navigate(['/client/confirm'])
  }
  // linkedin(){

  //   axios.post('https://api.linkedin.com/v2/me',{ headers: { "header": ` ${this.token}` } })
  //   .then((res) => {
  //   console.log(res,'linkedAnswer')   

  //   })
  //   .catch(function (error) {
  //     console.log(error);
  //   });
  // }
}
