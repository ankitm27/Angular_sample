import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';
import { QuizStorageService } from 'src/app/service/quiz-storage.service';
import { Router } from '@angular/router';
import * as Highcharts from 'highcharts';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SweetAlertService } from 'src/app/common/sweetalert2.service';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { QuizHttpService } from 'src/app/service/quiz-http.service';
import axios from 'axios';
import * as moment from 'moment';
import { HttpHeaders, HttpRequest, HttpInterceptor, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CustomValidators } from 'src/app/validator/custom-validator';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  public loading = false;
  page = 1;
  pageSize = 7;
  EdumonthList: any = [];
  EducountList: any = [];
  CormonthList: any = [];
  CorcountList: any = [];
  filteredQuizList: any = []
  @ViewChild('closebutton', { static: false }) closebutton;
  GraphDataMode: any = {
    'Education': '',
    'coparate': '',
    'edu': [],
    'cop': []
  }
  singleAudience: any;
  security: any
  multipleAudience: any;
  tokenValue = this.storageService.get('token');
  highcharts = Highcharts;
  chartOptions = {
    chart: {
      type: 'column',
    },
    title: {
      text: ''
    },
    legend: {
      //  layout: 'vertical',
      //  align: 'left',
      //  verticalAlign: 'top',
      x: 250,
      y: 100,
      floating: true,
      borderWidth: 1,

    },
    xAxis: {
      categories: ['Jan', 'Feb', 'March', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'],
    },
    yAxis: {
      min: 0, title: {
        text: 'Edu Institute'
      }
    },
    plotOptions: {
      column: {
        dataLabels: {
          enabled: true
        }
      }
    },

    series: [
      {
        name: "Edu-Institute",
        data: [28, 48, 40, 19, 86, 27, 90, 33, 55, 55, 23, 77]
      }

    ]
  }
  chartOptions2 = {
    chart: {
      type: 'column',
    },
    title: {
      text: ''
    },
    legend: {
      //  layout: 'vertical',
      //  align: 'left',
      //  verticalAlign: 'top',
      x: 250,
      y: 100,
      floating: true,
      borderWidth: 1,

    },
    xAxis: {
      categories: ['Jan', 'Feb', 'March', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'],
    },
    yAxis: {
      min: 0, title: {
        text: 'Corporate'
      }
    },
    plotOptions: {
      column: {
        dataLabels: {
          enabled: true
        }
      }
    },

    series: [
      {
        name: "Corporate",
        data: [28, 48, 40, 19, 86, 27, 90, 33, 55, 55, 23, 77]
      }

    ]
  }
  @ViewChild('security', { static: true }) securityInput: any;
  disabled = false;
  ShowFilter = false;
  limitSelection = false;

  dropdownList = [];
  selectedItems = [];
  filteredDashboardList: any = [];
  dropdownSettings = {};
  public userForm: FormGroup;

  constructor(private storageService: QuizStorageService, private router: Router, private fb: FormBuilder,
    private sweetAlert: SweetAlertService, private quizHttpService: QuizHttpService) { }

  ngOnInit() {
 
    this.dashboard();
    this.quiz_audience_options();
    this.enagment_type();
    this.initForm();
    this.viewQuiz();
 
    this.storageService.get('token');

    console.log(this.tokenValue, 'tokenValues')
    const $button = document.querySelector('#sidebar-toggle');
    const $wrapper = document.querySelector('#wrapper');

    $button.addEventListener('click', (e) => {
      e.preventDefault();
      $wrapper.classList.toggle('toggled');
    });

    this.dropdownSettings = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: false
    };
  }

  droplist: any = [];
  quiz_audience_options() {
    axios.get('http://env-9498608.cloudjiffy.net/api/admin/quiz_audience', { headers: { "token": ` ${this.tokenValue}` } })
      .then((response) => {
        this.droplist = response.data.list_quiz_audience;
        console.log(this.droplist);
        this.dropdownList = [];
        for (let opt of this.droplist) {
          this.dropdownList.push({
            'item_id': opt.id,
            'item_text': opt.quiz_audience
          })
        }


      })
  }

  list_engagement: any = [];
  enagment_type() {
    axios.get('http://env-9498608.cloudjiffy.net/api/admin/engagement_type', { headers: { "token": ` ${this.tokenValue}` } })
      .then((response) => {
        this.list_engagement = response.data.list_engagement_type;
        console.log(this.list_engagement, 'list_engagement');
      })
  }

  gettoken() {
    let head = new HttpHeaders().set(
      "Authorization",
      this.storageService.get('token')
    );
  }
  random: any
  initForm() {
    this.userForm = this.fb.group({
      location_of_quiz: ['', [Validators.required]],
      start_date: ['', [Validators.required]],
      end_date: ['', [Validators.required]],
      quiz_audience: ['', [Validators.required]],
      expected_part: ['', [Validators.required]],
      course: ['', [Validators.required]],
      quiz_id: ['', [Validators.required]]
    });
  }


  dashboardData: any;
  dashboardlist = [];
  perfomanceSnapshotData: any;
  perfomanceModel: any = {
    'tp': '',
    'cp': '',
    'ep': ''
  }
  GraphData: any;


  serialno: any = 1;
  graphEducation: number[];
  educationChart: any;
  corprateChart: any;
  categoryList: any = [];
  EducationGraphList:any=[];
  CorporateGraphList:any=[]
  dashboard() {
    this.loading = true;
    axios.get('http://env-9498608.cloudjiffy.net/api/admin/home_data', { headers: { "token": ` ${this.tokenValue}` } })
      .then((response) => {
        this.dashboardData = response.data.Data;
        this.perfomanceSnapshotData = response.data.Data.perfomanceSnapshot;
        this.perfomanceModel.tp = this.perfomanceSnapshotData.totalPartcipante;
        this.perfomanceModel.cp = this.perfomanceSnapshotData.Cp;
        this.perfomanceModel.ep = this.perfomanceSnapshotData.EP;
        this.dashboardlist = this.dashboardData.list;
        this.filteredDashboardList = this.dashboardData.list;
        this.GraphData = this.dashboardData.GraphData;
        this.EducationGraphList = this.GraphData.Education;
        this.CorporateGraphList = this.GraphData.coparate;
        console.log( this.EducationGraphList, 'monthList');
        console.log (this.CorporateGraphList , 'monthList');

        // GraphDataCode
        for (let data of this.EducationGraphList) {
          this.EdumonthList.push(
            data.month
          )
          this.EducountList.push(
            data.count
          )
        }
        console.log(this.EdumonthList, 'monthList');
        console.log(this.EducountList, 'countList')
        this.chartOptions.series[0].data = this.EducountList;
        this.chartOptions.xAxis.categories = this.EdumonthList;
        this.educationChart = this.chartOptions;


    //  CorporteGraphData

        for (let data of this.CorporateGraphList) {
          this.CormonthList.push(
            data.month
          )
          this.CorcountList.push(
            data.count
          )
        }
        console.log(this.CormonthList, 'monthList');
        console.log(this.CorcountList, 'countList')
    
    
        this.chartOptions2.series[0].data = this.CorcountList;
        this.chartOptions2.xAxis.categories = this.CormonthList;
        this.corprateChart = this.chartOptions2;
        // for (let key of this.GraphDataMode.Education) {
        //   for (var i in key) {

        //     this.GraphDataMode.edu.push(
        //       key[i]
        //     )

        //   } console.log(this.GraphDataMode.edu, 'edumode')
        // }
        // console.log(this.GraphDataMode.edu, 'GraphDataMode.edu')

        // for (let key of this.GraphDataMode.coparate) {
        //   Object.keys(key);
        //   console.log(key);
        //   for (var i in key) {

        //     this.GraphDataMode.cop.push(
        //       key[i],

        //     )

        //     this.categoryList.push(
        //       i
        //     )

        //   }
        //   console.log(this.categoryList, 'aa');
        // }
        // this.chartOptions.series[0].data = this.GraphDataMode.edu;
        // this.chartOptions.xAxis.categories = this.categoryList;
        // this.educationChart = this.chartOptions;
        // console.log(this.educationChart);
        // this.chartOptions2.series[0].data = this.GraphDataMode.cop;
        // this.chartOptions2.xAxis.categories = this.categoryList;

        // this.corprateChart = this.chartOptions2;
        this.loading = false;

      })
  }
  viewEngagement(engId) {
    this.storageService.set('engagementId', engId);
    this.router.navigate(['/admin/viewEng']);
  }
  // viewEngagment : any;
  // view_engagment(){
  //   axios.get('http://env-9498608.cloudjiffy.net/api/view_engagement',{ headers: {"token" : ` ${this.tokenValue}`} })
  //   .then((response) => {
  // this.viewEngagment=response.data.View_engagement;
  // this.storageService.set('anagment', this.viewEngagment);
  // console.log(this.viewEngagment, 'view anagment');
  //   })
  // }
  handleLimitSelection() {
    if (this.limitSelection) {
      this.dropdownSettings = Object.assign({}, this.dropdownSettings, { limitSelection: 2 });
    } else {
      this.dropdownSettings = Object.assign({}, this.dropdownSettings, { limitSelection: null });
    }
  }

  onItemSelect(item: any) {
    console.log('onItemSelect', item);
    this.singleAudience = item
  }
  onSelectAll(items: any) {
    console.log('onSelectAll', items);
    this.multipleAudience = items
  }
  toogleShowFilter() {
    this.ShowFilter = !this.ShowFilter;
    this.dropdownSettings = Object.assign({}, this.dropdownSettings, { allowSearchFilter: this.ShowFilter });
  }
  randomString() {
    let chars = '0123456789';
    let length = 4;
    var result = '';
    for (var i = length; i > 0; --i)
      result += chars[Math.floor(Math.random() * chars.length)];
    // this.securityInput.nativeElement.value = result;
    this.random = result
    console.log('result', this.random)
    this.security = this.random
  }
  dataResponse: any;
  save() {
    if (this.userForm.valid) {

      const reqMap = {
        ...this.userForm.value,
        "security": this.security
      };

      var course = new String("");
      var str2 = new String(",");
      for (let i of reqMap.course) {
        var str1 = new String("");
        str1 = i.item_text;
        course = course + i.item_text + ',';


        //   course = i.item_text ;
        //  console.log(i.item_text, i)
      }

      reqMap.course = course;

      reqMap['start_date'] = moment(reqMap['start_date']).format('YYYY-MM-DD');
      reqMap['end_date'] = moment(reqMap['end_date']).format('YYYY-MM-DD');

      reqMap['security'] = this.security;
      console.log(reqMap);
      if (this.userForm.value.end_date >= this.userForm.value.start_date) {
        axios.post('http://env-9498608.cloudjiffy.net/api/admin/add_engagement', reqMap, { headers: { "token": ` ${this.tokenValue}` } })
          .then((response) => {
            if (response.data.code == 200) {
              this.dataResponse = response;
              this.closebutton.nativeElement.click();
              this.sweetAlert.swalSuccess('Engagement Added Successfully')
              this.dashboard();
              this.userForm.reset();
            } else {
              this.sweetAlert.swalError(response.data.failed);
            }


          })
          .catch(function (error) {
            console.log(error);
          });
      } else {
        this.sweetAlert.swalError('EndDate cannot be smaller')
      }
    }
    else {
      CustomValidators.validateAllFormFields(this.userForm);
    }



  }
  reset() {
    this.userForm.reset();
  }
  viewQuiz() {
    this.loading = true;
    axios.get('http://env-9498608.cloudjiffy.net/api/admin/list_quiz', { headers: { "token": ` ${this.tokenValue}` } })
      .then((response) => {

        if (response.data.code == 200) {

          this.filteredQuizList = response.data.list_quiz;

          console.log(this.dataResponse, 'check');

        }
        else if (response.data.code != 200) {
          this.sweetAlert.swalError('error occurred');
        }
        this.loading = false;
      })
      .catch(function (error) {
        console.log(error);
      });

  }



}
