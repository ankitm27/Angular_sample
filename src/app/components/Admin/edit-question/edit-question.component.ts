import { Component, OnInit } from '@angular/core';
import { SweetAlertService } from 'src/app/common/sweetalert2.service';
import { Router } from '@angular/router';
import { QuizStorageService } from 'src/app/service/quiz-storage.service';
import axios from 'axios';

@Component({
  selector: 'app-edit-question',
  templateUrl: './edit-question.component.html',
  styleUrls: ['./edit-question.component.css']
})
export class EditQuestionComponent implements OnInit {
  tokenValue= this.storageService.get('token');
  quizid = this.storageService.get('quizId');
  optionArray = [];
  dataArray = [];
  dataResponse: any = [];
  pastOptions:any=[];
  correctArray:any=[];
status = this.storageService.get('status')
  constructor(private router: Router, private storageService: QuizStorageService,
    private sweetAlert: SweetAlertService) { }

  ngOnInit() {
    this.viewquestionModel.id = this.storageService.get('questionID');
    console.log(this.viewquestionModel.id);
    this.viewquestionModel.question_type = this.storageService.get('questionType');
    console.log(this.viewquestionModel.question_type);
    this.viewquestionModel.question = this.storageService.get('question');
    console.log(this.viewquestionModel.question);
    this.viewquestionModel.options = this.storageService.get('questionOptions');
    console.log(this.viewquestionModel.options);
    this.pastOptions = this.viewquestionModel.options[0];
    this.viewquestionModel.correctAnswer = this.storageService.get('questionAnswer');

    let correctAnswerList:any= this.viewquestionModel.correctAnswer.split(',');
    correctAnswerList.forEach(ans => {
      this.correctArray.push({
        'name':ans
      }
     
      )
    });
         console.log(this.correctArray,"optionFromList");

   
// for (let opt of this.viewquestionModel.options) {
//       this.dataArray.push(opt);
//     }
    if (this.viewquestionModel.question_type == 1) {
      this.status = 1;

    } else if (this.viewquestionModel.question_type == 2) {
      this.status = 2;

    }
  }


  viewQuestion() {
    this.router.navigate(['/admin/manageQuestion']);
    this.storageService.set('quizId', this.quizid);
  }

  viewquestionModel: any = [{
    "id": "",
    "question": "",
    "question_type": "",
    "options": [],
    "correctAnswer": ""

  }];


  addmultiple() {
    // for (let ch of this.dataArray) {
    //   ch.push({
        
    //   });

    // }
    this.pastOptions.push({
    name: ''
    });
    console.log(this.pastOptions)
  }
  removemultiple(i: number) {
    this.pastOptions.splice(i, 1);
  }

  saveEdit(){
    const reqMap ={
      "id":this.viewquestionModel.id,
      "question": this.viewquestionModel.question,
      "options":this.viewquestionModel.options,
      "correctOption": this.viewquestionModel.correctAnswer
    }
    console.log(reqMap,"edit data")
    axios.post('http://env-9498608.cloudjiffy.net/api/admin/edit_question', reqMap,{ headers: {"token" : ` ${this.tokenValue}`} })
    .then((response) => {
      if (response.data.code == 200) {
        this.dataResponse = response.data.View_Question;
        this.sweetAlert.swalSuccess(response.data.success)
        this.viewQuestion();

      }


    });
// this.dataArray =[];
// this.answerList =[];
  }
  answerList: any =[];
  selectedItems:any;
  onChnageAns(event){
    this.answerList.push({
    
      name: event
    })
    console.log(this.answerList);
    this.viewquestionModel.correctAnswer = name

  }
  selected:any
  getValues() {
    console.log(this.selected);
    this.viewquestionModel.correctAnswer = this.selected
  }
  newList:any=[];
flag = 0;
onSearchChange(searchValue: string): void {  
  this.flag =1;
  console.log(searchValue);
  console.log('dasa');
  console.log(this.pastOptions,'dtalist')
  // this.pastOptions.push({
  //   name: searchValue
  // })
this.newList = this.pastOptions
}
}