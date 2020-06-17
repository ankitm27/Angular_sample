import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts'; 
import { Router } from '@angular/router';
import { QuizStorageService } from 'src/app/service/quiz-storage.service';


@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css']
})
export class AdminHomeComponent implements OnInit  {
  @ViewChild('security',{ static: true }) securityInput: any;
 
  public barChartOptions: ChartOptions = {
    responsive: true,
  };
  

  public barChartLabels: Label[] = ['Jan', 'Feb', 'March', 'Apr', 'May', 'June', 'July','Aug','Sept','Oct','Nov','Dec'];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [];

  public barChartData: ChartDataSets[] = [
    // { data: [65, 59, 80, 81, 56, 55, 40], label: 'Corporate' },
    { data: [28, 48, 40, 19, 86, 27, 90], label: ' Edu Institiutes' }
  ];
  public barChartData2: ChartDataSets[] = [
    { data: [65, 59, 80, 81, 56, 55, 40], label: 'Corporate' },
    // { data: [28, 48, 40, 19, 86, 27, 90], label: ' Edu Institiutes' }
  ];
  constructor(private router:Router, private storageService: QuizStorageService) { }
  loggedInUserDetails:any;
  ngOnInit() {
    this.loggedInUserDetails = this.storageService.get('currentUser');
    const $button  = document.querySelector('#sidebar-toggle');
const $wrapper = document.querySelector('#wrapper');

$button.addEventListener('click', (e) => {
  e.preventDefault();
  $wrapper.classList.toggle('toggled');
});

  }
  randomString() {
    let chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let length = 6;
    var result = '';
    for (var i = length; i > 0; --i) 
    result += chars[Math.floor(Math.random() * chars.length)];
    this.securityInput.nativeElement.value = result;
}

  home(){
    this.router.navigate(['/admin/home']);
  }
  save(reg){
    this.router.navigate(['/admin/home'])
  }
}
