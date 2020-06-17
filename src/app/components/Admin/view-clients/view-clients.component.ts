import { Component, OnInit } from '@angular/core';
import { QuizStorageService } from 'src/app/service/quiz-storage.service';

@Component({
  selector: 'app-view-clients',
  templateUrl: './view-clients.component.html',
  styleUrls: ['./view-clients.component.css']
})
export class ViewClientsComponent implements OnInit {

  constructor(private storageService:QuizStorageService) { }
  clientDetails:any;
  ngOnInit() {
    this.clientDetails= this.storageService.get('userdetails');
console.log('data agya' ,this.clientDetails);
    const $button  = document.querySelector('#sidebar-toggle');
    const $wrapper = document.querySelector('#wrapper');
    
    $button.addEventListener('click', (e) => {
      e.preventDefault();
      $wrapper.classList.toggle('toggled');
    });
    this.userd();
  }

  userModel: any = {
    "firstName": "",
    "lastName": "",
    "phoneNumber": "",
    "email": "",

  }
  userd() {
    this.userModel.firstName = this.clientDetails[0].first_name,
      this.userModel.lastName = this.clientDetails[0].last_name,
      this.userModel.phoneNumber = this.clientDetails[0].phone_no,
      this.userModel.email = this.clientDetails[0].email
  }

}
