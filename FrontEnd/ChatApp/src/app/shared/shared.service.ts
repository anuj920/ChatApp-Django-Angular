import {Injectable} from '@angular/core';

import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';

import {environment} from '../../environments/environment';


@Injectable()
export class SharedService {
  constructor(private toastr: ToastrService, private ngxSpinner: NgxSpinnerService) {
  }

  success(title: string, message: string): void {
    this.toastr.success(title, message);
  }

  error(title: string, message: string): void {
    this.toastr.error(title, message);
  }

  showSpinner(): void{
    this.ngxSpinner.show();
  }

  hideSpinner(): void{
    this.ngxSpinner.hide();
  }

}
