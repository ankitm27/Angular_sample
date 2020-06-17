import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import * as $ from '../../../../../node_modules/jquery';
import { QuizStorageService } from 'src/app/service/quiz-storage.service';
import { QuizHttpService } from 'src/app/service/quiz-http.service';
import { SweetAlertService } from 'src/app/common/sweetalert2.service';
import axios from 'axios';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { CustomValidators } from 'src/app/validator/custom-validator';

@Component({
  selector: 'app-add-quiz',
  templateUrl: './add-quiz.component.html',
  styleUrls: ['./add-quiz.component.css']
})
export class AddQuizComponent implements OnInit {
  public loading = false;
countquestion:any;
  public addQuizForm: FormGroup;
  public editQuizForm: FormGroup;
  @ViewChild('closebutton', { static: false }) closebutton: { nativeElement: { click: () => void; }; };
  @ViewChild('closebutton2', { static: false }) closebutton2: { nativeElement: { click: () => void; }; };
  page = 1;
  pageSize = 7;
  dataResponse: any [] = [];
  filteredQuizList:any =[];
  noofQuestions:any;
  savedQuiz: any;
  tokenValue = this.storageService.get('token');
  constructor(private fb: FormBuilder, private storageService: QuizStorageService,
    private router: Router, private httpService: QuizHttpService, private sweetAlert: SweetAlertService) { }

  ngOnInit() {
    const $button = document.querySelector('#sidebar-toggle');
    const $wrapper = document.querySelector('#wrapper');

    $button.addEventListener('click', (e) => {
      e.preventDefault();
      $wrapper.classList.toggle('toggled');
    });
    this.initForm();
    this.viewQuiz();
    this.enagment_type();
  }
  initForm() {
    this.addQuizForm = this.fb.group({
      numberOfQuestions: ['', [Validators.required]],
      quizType: ['', [Validators.required]],
      quiz_name:['',[Validators.required]]
    });
    this.editQuizForm = this.fb.group({
      numberOfQuestions: ['', [Validators.required]],


    });
  }


  list_engagement: any = [];
  enagment_type() {
    axios.get('http://env-9498608.cloudjiffy.net/api/admin/engagement_type',{ headers: {"token" : ` ${this.tokenValue}`} })
      .then((response) => {
        this.list_engagement = response.data.list_engagement_type;

        console.log(this.list_engagement, 'list_engagement');
      })
  }


  addQuizModel: any = {

    "quizType": '',
    "numberOfQuestions": '',
    "engagment_id": ''

  }

  save() {
    if (this.addQuizForm.valid) {
    const reqMap = {
      ...this.addQuizForm.value,


    };
    // if (reqMap.quizType == "1") {
    //   reqMap['quizType'] = "corporate";
     
    // }
    // else if (reqMap.quizType == "2") {
    //   reqMap['quizType'] = "educate";
      
    // }
    console.log(reqMap, ' ...this.addQuizForm.value');
    console.log(this.addQuizModel, ' ...this.addQuizForm.value');
    this.loading = true;

    axios.post('http://env-9498608.cloudjiffy.net/api/admin/add_quiz', reqMap,{ headers: {"token" : ` ${this.tokenValue}`} })
      .then((response) => {
        this.loading = false
        if (response.data.code == 200) {
          this.addQuizModel.quizType = '';
          this.addQuizModel.noOfQuestion = '';
          this.addQuizModel.engagment_id = '';
          this.savedQuiz = response;

          console.log(this.savedQuiz.success, 'check');

          this.closebutton.nativeElement.click();
          this.sweetAlert.swalSuccess('Quiz Added Successfully')
          this.viewQuiz();
        }
        else if (response.data.code != 200) {
          this.sweetAlert.swalError('error occurred');
        }
      })
      .catch(function (error) {
        console.log(error);
      });
      this.addQuizForm.reset();

    }else {
      CustomValidators.validateAllFormFields(this.addQuizForm);
    }

  }
  quizId: any;
  questionCount:any;
  quizid(id: any,question_count) {
    this.quizId = id;
    console.log(id, 'quizid'); 
    this.questionCount = question_count;
    console.log(this.questionCount, 'questionCount'); 

  }
  editQuiz() {
    this.loading = true;
    const reqMap = {
      ...this.editQuizForm.value,


    };
    let edit = {
      "quizid": this.quizId,
      "no_of_ques": reqMap.numberOfQuestions
    }
    console.log(reqMap.numberOfQuestions, ' ...this.editQuizForm.value');
    console.log(this.questionCount, ' ...this.editQuizForm.value');

if(reqMap.numberOfQuestions >=  this.questionCount){
  axios.post('http://env-9498608.cloudjiffy.net/api/admin/edit_quiz', edit,{ headers: {"token" : ` ${this.tokenValue}`} })
  .then((response) => {

    if (response.data.code == 200) {

      this.closebutton.nativeElement.click();
      this.sweetAlert.swalSuccess('Quiz edited Successfully')
      this.viewQuiz();
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
else{
  this.sweetAlert.swalError('cannot edit number of question is more in quiz');
  this.loading = false;

}

    this.quizId = '';
    this.editQuizForm.reset();

    this.closebutton.nativeElement.click();

  }
reset(){
  this.editQuizForm.reset();
      this.addQuizForm.reset();

}

filteredQuizListLength :any;
  viewQuiz() {
    this.loading = true;
    axios.get('http://env-9498608.cloudjiffy.net/api/admin/list_quiz',{ headers: {"token" : ` ${this.tokenValue}`} })
      .then((response) => {

        if (response.data.code == 200) {
          this.dataResponse = response.data.list_quiz;
          this.filteredQuizListLength = response.data.list_quiz.length;
         this.filteredQuizList = this.dataResponse
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
  deleteQuiz(emp: any) {
    console.log(emp, "id")
    const reqMap = {
      "id": emp

    };
    Swal.fire({
      html: '<h3 class="mt-5 mb-4 mx-2">Are you sure you want to delete this quiz?</h3>',
      animation: true,
      width: 600,
      padding: '3em',
      showCancelButton: true,
      focusConfirm: false,
      cancelButtonText: 'No',
      cancelButtonColor: '#17A2B8',
      cancelButtonClass: 'btn btn-outline-info btn-pill px-4 mr-2',
      confirmButtonColor: '#DD6B55',
      confirmButtonClass: 'btn btn-danger btn-pill px-4',
      confirmButtonText: 'Yes'
    }).then((result) => {
      if (result.value) {
        axios.post('http://env-9498608.cloudjiffy.net/api/admin/delete_quiz', reqMap,{ headers: {"token" : ` ${this.tokenValue}`} })
        .then((response) => {
          if (response.data.code == 200) {
            this.dataResponse = response.data.list_quiz;
            this.viewQuiz();
          }
  
  
        });
      }
    });


    this.viewQuiz();
  }
  quizType() {

    axios.get('http://env-9498608.cloudjiffy.net/api/admin/list_quizType',{ headers: {"token" : ` ${this.tokenValue}`} })
      .then((response) => {

      })
      .catch(function (error) {
        console.log(error);
      });
  }


  roleModel: any = {
    "id": 0,
    "type": ""
  }

  // onChange(event: any) {
  //   console.log('event', event);
  //   console.log('roleModel', this.roleModel.id);
  //   console.log('roleModel', this.roleModel.type);

  // }

  viewQuestion(emp) {
    this.quizId = emp,
      this.storageService.set('quizId', this.quizId);
    console.log(this.quizId, 'quizId');
    this.router.navigate(['/admin/manageQuestion'])
  }
  addQuestion(emp,numberOfQuestions,questionCount) {
    this.quizId = emp,
    this.countquestion = questionCount;
    this.noofQuestions = numberOfQuestions;
    if(this.noofQuestions >  this.countquestion){
      this.storageService.set('quizId', this.quizId);
      this.storageService.set('countquestion', this.countquestion);
      this.storageService.set('noofQuestions', this.noofQuestions);
    console.log(this.quizId, 'quizId');
    this.router.navigate(['/admin/addQuestion'])
    } else{
      this.sweetAlert.swalError('Please increase number of questions in quiz as quiz is having maximum questions');
    }


  }
  // roleModel: any = {
  //   "id": 0,
  //   "type": ""
  // }
  slectedValue: any;

  onChange(event: any) {
    console.log('event', event);
    console.log('roleModel', this.roleModel.id);
    console.log('roleModel', this.roleModel.type);

  }


}
