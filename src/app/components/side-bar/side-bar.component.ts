import { Component, OnInit } from '@angular/core';
import * as $ from '../../../../node_modules/jquery';
import { Router } from '@angular/router';
import { QuizStorageService } from 'src/app/service/quiz-storage.service';
@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent implements OnInit {

  constructor(private router: Router, private storageService: QuizStorageService) { }
  loggedInUserDetails: any;
  
  
  ngOnInit() {
    



  }
  checkClass(value){
    if(this.router.url == value) return true; else return false;
  }
  logout(){
    localStorage.removeItem('currentUser');
    localStorage.removeItem('token');
    this.router.navigate(['/homeAdmin']);
    localStorage.removeItem('userEmail');


  }
}
