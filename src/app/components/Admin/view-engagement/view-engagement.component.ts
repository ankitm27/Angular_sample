import { Component, OnInit } from '@angular/core';
import { ExcelServicesService } from 'src/app/service/excel-service.service';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { SweetAlertService } from 'src/app/common/sweetalert2.service';
import { QuizStorageService } from 'src/app/service/quiz-storage.service';
import axios from 'axios';
import * as $ from '../../../../../node_modules/jquery';

@Component({
  selector: 'app-view-engagement',
  templateUrl: './view-engagement.component.html',
  styleUrls: ['./view-engagement.component.css']
})
export class ViewEngagementComponent implements OnInit {
  // list =  this.storageService.get('anagment');
  public loading = false;

  tokenValue = this.storageService.get('token');
  EngagementId = this.storageService.get('engagementId')
  lessThenList = [];
  topFiveList = [];
  usersList = [];
  greaterThenList = [];
  result = [];
  engageMentList: any = [];
  Quiz_Info_Name: any;
  Quiz_Info_totalPartcipante: any;
  Quiz_Info_Average_Score: any;
  Quiz_Info_Type: any;
  Quiz_Info_startDate:any;
  Quiz_Info_endDate:any
  constructor(private storageService: QuizStorageService, private excelService: ExcelServicesService, private http: HttpClient, private alertService: SweetAlertService) {


  }
  exportuserList(): void {
    this.excelService.exportAsExcelFile(this.usersList, 'sample');
    this.alertService.swalSuccess('Excel Succesfully Downloaded');

  }
  exportAstopFive(): void {
    this.excelService.exportAsExcelFile(this.topFiveList, 'sample');
    this.alertService.swalSuccess('Excel Succesfully Downloaded');

  }
  exportAsgreterThen(): void {
    this.excelService.exportAsExcelFile(this.greaterThenList, 'sample');
    this.alertService.swalSuccess('Excel Succesfully Downloaded');

  }
  exportAslessThen(): void {
    this.excelService.exportAsExcelFile(this.lessThenList, 'sample');
    this.alertService.swalSuccess('Excel Succesfully Downloaded');

  }
  public getJSON(): Observable<any> {
    return this.http.get('https://api.myjson.com/bins/zg8of');
  }
  ngOnInit() {
    this.view_engagment();
    this.viewngagment();
    const $button = document.querySelector('#sidebar-toggle');
    const $wrapper = document.querySelector('#wrapper');

    $button.addEventListener('click', (e) => {
      e.preventDefault();
      $wrapper.classList.toggle('toggled');
    });
  }

  viewEngagment: any;

  Quiz_Info:any=[];
  listofusers: any = [];
  TopFive: any = [];
  Greater_than_70: any = [];
  Less_than_30: any = [];
  view_engagment() {
    // this.viewEngagment = this.storageService.get('anagment');
    // this.Quiz_Info=this.viewEngagment.Quiz_Info;
    // this.listofusers = this.viewEngagment.listofusers;
    // this.TopFive = this.viewEngagment.TopFive;
    // this.Greater_than_70 = this.viewEngagment.Greater_than_70;
    // this.Less_than_30 = this.viewEngagment.Less_than_30;
    // console.log(this.viewEngagment, 'check view');
    // console.log(this.Quiz_Info, 'check Quiz_Info');
    // console.log(this.listofusers, 'check listofusers');
    // console.log(this.TopFive, 'check TopFive');
    // console.log(this.Greater_than_70, 'check Greater_than_70');
    // console.log(this.Less_than_30, 'check Less_than_30');
  }
  viewngagment() {
    this.loading = true;
    const reqMap =
    {
      "id": this.EngagementId
    }
    axios.post('http://env-9498608.cloudjiffy.net/api/admin/view_engagement', reqMap, { headers: { "token": ` ${this.tokenValue}` } })
      .then((response) => {
        // this.excel.push(response.data.View_engagement.Less_than_30[0]); 
        console.log(response.data.Quiz_Info, 'check Less_than_30');
        this.listofusers = response.data.listofusers;
        console.log(response.data.listofusers, 'check listofusers');
        this.TopFive = response.data.TopFive,
        console.log(response.data.TopFive, 'check TopFive');
        this.Less_than_30 = response.data.Less_than_30;
        console.log(response.data.Less_than_30, 'check Less_than_30');

        this.Greater_than_70 = response.data.Greater_than_70,
        console.log(response.data.Greater_than_70, 'check Greater_than_70');

        this.Quiz_Info = response.data.Quiz_Info,
        console.log(response.data.Quiz_Info, 'check Less_than_30');

        this.Quiz_Info_Name = this.Quiz_Info[0].quiz_name,
        this.Quiz_Info_totalPartcipante = this.Quiz_Info[0].total_part;
        this.Quiz_Info_startDate = this.Quiz_Info[0].StartDate;
        this.Quiz_Info_endDate = this.Quiz_Info[0].EndDate;
        this.Quiz_Info_Average_Score = this.Quiz_Info[0].avg_score;
        this.Quiz_Info_Type= this.Quiz_Info[0].quizAudience;
        for (let u of this.Less_than_30) {
          this.lessThenList.push(u);
        }
        this.listofusers = this.listofusers;
        for (let u of this.listofusers) {
          this.usersList.push(u);
        }
        this.TopFive = this.TopFive;
        for (let u of this.TopFive) {
          this.topFiveList.push(u);
        }
        this.Greater_than_70 = this.Greater_than_70;
        for (let u of this.Greater_than_70) {
          this.greaterThenList.push(u);
        }
        console.log(this.result, 'check Less_than_30');
         this.loading = false;

      });
  }

  // viewngagment() {
  //   const reqMap =
  //   {
  //     "engagemenrID": this.EngagementId
  //   }
  //   axios.post('http://env-9498608.cloudjiffy.net/api/view_engagement', reqMap, { headers: { "token": ` ${this.tokenValue}` } })
  //     .then((response) => {
  //       // this.excel.push(response.data.View_engagement.Less_than_30[0]);
  //       this.viewEngagment = response.data.View_engagement,
  //       console.log('list',this.viewEngagment)
  //       this.Quiz_Info = this.viewEngagment.Quiz_Info;
  //       this.listofusers = this.viewEngagment.listofusers;
  //       this.TopFive = this.viewEngagment.TopFive;
  //       this.Greater_than_70 = this.viewEngagment.Greater_than_70;
  //       this.Less_than_30 = this.viewEngagment.Less_than_30;
  //       this.storageService.set('anagment', this.viewEngagment);
  //       console.log(this.viewEngagment, 'view anagment');

  //     })
  // }
  userList() {
    $('.userList').show();
    $('.topFive').hide();
    $('.greterThen').hide();
    $('.lessThen').hide();
  }
  topFive() {
    $('.userList').hide();
    $('.topFive').show();
    $('.greterThen').hide();
    $('.lessThen').hide();
  }

  greterThen() {
    $('.userList').hide();
    $('.topFive').hide();
    $('.greterThen').show();
    $('.lessThen').hide();
  }
  lessThen() {
    $('.userList').hide();
    $('.topFive').hide();
    $('.greterThen').hide();
    $('.lessThen').show();
  }

}
