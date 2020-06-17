import {
  Injectable
} from '@angular/core';
import Swal from 'sweetalert2';

const myWindow: any = typeof window !== 'undefined' && window || {};

@Injectable()
export class SweetAlertService {
  constructor() {
    // nothing to do in here :)
  }

  swal(opt) {
    return Swal.fire(opt);
  }

  swalSuccess(title) {
    return Swal.fire({
      type: 'success',
      position: 'top-right',
      html: `<h5 style="color:#ffffff;">${title}</h5>`,
      width: 300,
      padding: 20,
      background: '#c60808',
      customClass: 'red-border',
      // background: '#fff url(../../../assets/media/img/misc/user_profile_bg.jpg)',
      showConfirmButton: false,
      timer: 3000,
      toast: true
    });
  };

  swalError(title?) {
    return Swal.fire({
      type: 'error',
      position: 'top-right',
      html: `<h5 style="color:#ffffff;">${title ? title : 'Sorry, something went wrong, please try again!'}</h5>`,
      width: 300,
      padding: 20,
      background: '#c60808',
      customClass: 'red-border',
      // background: '#fff url(../../../assets/media/img/misc/user_profile_bg.jpg)',
      showConfirmButton: false,
      timer: 9000,
      toast: true
    });
  }

  confirm(options) {
    const defaultOptions = {
      confirmButtonText: 'Confirm',
      showCancelButton: true,
      type: 'warning'
    };
    return myWindow.Sweetalert2(Object.assign(defaultOptions, options));
  }


  prompt(options) {
    const defaultOptions = {
      confirmButtonText: 'Submit',
      showCancelButton: true,
      input: 'text'
    };
    return myWindow.Sweetalert2(Object.assign(defaultOptions, options));
  }

  alert(options) {
    const defaultOptions = {
      confirmButtonText: 'OK',
      type: 'info'
    };
    return myWindow.Sweetalert2(Object.assign(defaultOptions, options));
  }

  question(options) {
    return this.alert(
      Object.assign({
        type: 'question'
      }, options));
  }

  success(options) {
    return this.alert(Object.assign({
      type: 'success'
    }, options));
  }

  warning(options) {
    return this.alert(Object.assign({
      type: 'warning'
    }, options));
  }

  error(options) {
    return this.alert(Object.assign({
      type: 'error'
    }, options));
  }

  info(options) {
    return this.alert(Object.assign({
      type: 'info'
    }, options));
  }

}
