import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import axios from 'axios';

@Component({
  selector: 'app-instruction',
  templateUrl: './instruction.component.html',
  styleUrls: ['./instruction.component.css']
})
export class InstructionComponent implements OnInit {
token = 'X-Restli-Protocol-Version: 2.0.0';
  constructor(private router:Router) { }

  ngOnInit() {
    
  }
  start(){
    this.router.navigate(['client/dashboard']);
    // this.router.navigate(['client/panel']);
  }
  logout() {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('userToken');
    this.router.navigate(['/home']);
    localStorage.removeItem('userEmail');
  }
  // linkedin(){
 
  //   axios.get('https://api.linkedin.com/v1/people/~', {
          
  //   })
  //   .then(function (response) {
  //     console.log(response);
  //   })
  // }
}
