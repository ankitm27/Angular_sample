import { Component, OnInit } from '@angular/core';
import * as $ from '../../../../../node_modules/jquery';
import { Router } from '@angular/router';

@Component({
  selector: 'app-client-panel',
  templateUrl: './client-panel.component.html',
  styleUrls: ['./client-panel.component.css']
})
export class ClientPanelComponent implements OnInit {

  constructor(private router:Router) { }



  
  ngOnInit() {
   

  }

}
