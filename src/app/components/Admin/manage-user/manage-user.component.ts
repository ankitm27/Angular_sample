import { Component, OnInit, ViewChild } from '@angular/core';
import { QuizStorageService } from 'src/app/service/quiz-storage.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SweetAlertService } from 'src/app/common/sweetalert2.service';
import { QuizHttpService } from 'src/app/service/quiz-http.service';
import axios from 'axios';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { CustomValidators } from 'src/app/validator/custom-validator';

@Component({
  selector: 'app-manage-user',
  templateUrl: './manage-user.component.html',
  styleUrls: ['./manage-user.component.css']
})
export class ManageUserComponent implements OnInit {
  public loading = false;

  public userForm: FormGroup;
  tokenValue = this.storageService.get('token');
  page = 1;
  pageSize = 7;
  @ViewChild('closebutton', { static: false }) closebutton;
  constructor(private storageService: QuizStorageService, private sweetAlert: SweetAlertService, private fb: FormBuilder,
    private quizHttpService: QuizHttpService, private router: Router) { }
  loggedInUserDetails: any;
  dataResponse: any;
  userList: any[] = [];
  filteredUserList: any = [];
  userDetails: any;
  ngOnInit() {
    this.initForm();
    this.viewUser();
    this.loggedInUserDetails = this.storageService.get('currentUser');
    const $button = document.querySelector('#sidebar-toggle');
    const $wrapper = document.querySelector('#wrapper');

    $button.addEventListener('click', (e) => {
      e.preventDefault();
      $wrapper.classList.toggle('toggled');
    });
  }

  initForm() {
    this.userForm = this.fb.group({
      first_name: ['', [Validators.required]],
      last_name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.pattern(/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/)]],
      password: ['', [Validators.required]],
      phone_no: ['', [Validators.required,Validators.pattern(/^(?:(?:\+|0{0,2})91(\s*[\ -]\s*)?|[0]?)?[789]\d{9}|(\d[ -]?){10}\d$/)]],

      is_active: true

    });
  }

  save() {
    if (this.userForm.valid) {
      const reqMap = {
        ...this.userForm.value,
        "user_type": "admin",
      };
      // console.log(reqMap)
      axios.post('http://env-9498608.cloudjiffy.net/api/auth/register', reqMap, { headers: { "token": ` ${this.tokenValue}` } })
        .then((response) => {
          if (response.data.code == 200) {
            this.dataResponse = response;

            console.log(this.dataResponse.success, 'check');

            this.closebutton.nativeElement.click();
            this.sweetAlert.swalSuccess('User Added Successfully')
            this.userForm.reset();
          } else if (response.data.code != 200) {
            this.sweetAlert.swalError('error occurred')

          }
        })
        .catch(function (error) {
          console.log(error);
        });
      this.viewUser();
    }
    else {
      CustomValidators.validateAllFormFields(this.userForm);
    }
  }

  viewUser() {
    this.loading = true;
    axios.get('http://env-9498608.cloudjiffy.net/api/admin/list_users', { headers: { "token": ` ${this.tokenValue}` } })
      .then((response) => {
        this.userList = response.data.list_users;
        this.filteredUserList = response.data.list_users.length;

        console.log(this.userList.length, 'filteredUserList');


        this.loading = false
      })
  }
  deleteUser(emp) {
    console.log(emp, "id")
    const reqMap = {
      "id": emp

    };
    Swal.fire({
      html: '<h3 class="mt-5 mb-4 mx-2">Are you sure you want to delete this user?</h3>',
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
        axios.post('http://env-9498608.cloudjiffy.net/api/admin/delete_users', reqMap, { headers: { "token": ` ${this.tokenValue}` } })
          .then((response) => {
            this.userList = response.data.list_users;
            // this.filteredUserList = response.data.list_users.length;
            console.log(this.userList, 'UserList');
            this.viewUser();



          })
      }
    });

  }
  viewDetails(emp) {
    const reqMap = {
      "id": emp

    };
    axios.post('http://env-9498608.cloudjiffy.net/api/admin/view_users', reqMap, { headers: { "token": ` ${this.tokenValue}` } })
      .then((response) => {
        this.userDetails = response.data.list_users;

        console.log(this.userDetails, 'userDetails');

        this.storageService.set('userdetails', this.userDetails);
        this.router.navigate(['/admin/viewUser']);

      })
    this.viewUser();
  }
  telInputObject(obj) {
    console.log(obj);
    obj.setCountry('in');
  }
}
