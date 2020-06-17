import {NgModule, ModuleWithProviders} from '@angular/core';

import { SharedServiceService } from '../shared-service.service';
import { CommonModule } from '@angular/common';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { SweetAlertService } from '../sweetalert2.service';
import { InputOnlyNumberDirective } from 'src/app/components/directive/input-only-number.directive';
import { ShowErrorsComponent } from 'src/app/validator/show-error';

@NgModule({
  imports: [CommonModule, NgbModule.forRoot()],
  declarations: [InputOnlyNumberDirective,ShowErrorsComponent],
  providers: [SweetAlertService],
  exports: [NgbModule, InputOnlyNumberDirective,ShowErrorsComponent]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,

      providers: [SweetAlertService,SharedServiceService]
    };
  }
}
