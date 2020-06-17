import {Component, Input} from '@angular/core';
import {AbstractControlDirective, AbstractControl} from '@angular/forms';

@Component({
  selector: 'show-errors',
  template: `
    <div *ngIf="shouldShowErrors()" class="show-error-field">
      <p class="text-danger" *ngFor="let error of listOfErrors()">{{error}}</p>
    </div>
  `,
})
export class ShowErrorsComponent {

  private static readonly errorMessages = {
    'required': () => 'This field is required',
    'email': () => 'Please provide valid email address',
    'minlength': (params) => 'The min number of characters is ' + params.requiredLength,
    'maxlength': (params) => 'The max allowed number of characters is ' + params.requiredLength,
    'pattern': (params) => 'Please enter a valid data format',
    'customPattern': (params) => params,
    // 'pattern': (params) => 'The required pattern is: ' + params.requiredPattern,
    'years': (params) => params.message,
    'countryCity': (params) => params.message,
    'uniqueName': (params) => params.message,
    'telephoneNumbers': (params) => params.message,
    'telephoneNumber': (params) => params.message,
    'matchPassword': (params) => params.message,
    'strongPassword': (params) => params.message,
    'validCC': (params) => params.message
    // 'min': (params) => 'The min number of characters is ' + params.min,
    // 'max': (params) => 'The max allowed number of characters is ' + params.max
  };

  @Input() private control: AbstractControlDirective | AbstractControl;
  @Input() private patternMessage: string;

  shouldShowErrors(): boolean {
    return this.control && this.control.errors && (this.control.dirty || this.control.touched);
  }

  listOfErrors(): string[] {
    return Object.keys(this.control.errors)
      .map(field => {
        // console.log(field);
        // console.log(this.control);
        // console.log(this.control.errors);
        // console.log(this.patternMessage);
        if (this.patternMessage) {
          return this.getMessage('customPattern', this.patternMessage);
        } else {
          // if (field !== '__zone_symbol__state' || field !== '__zone_symbol__value')
          return this.getMessage(field, this.control.errors[field]);
        }
      });
  }

  private getMessage(type: string, params: any) {
    // console.log(type)
    return ShowErrorsComponent.errorMessages[type](params);
  }

}
