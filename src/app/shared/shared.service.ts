import { ToastrService } from 'ngx-toastr';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor(
    private toastr: ToastrService
  ) { }

  msgSuccess(msgBody: string, title: string) {
    return this.toastr.success(msgBody, title);
  }

  msgError(title: any, msgBody: string) {
    this.toastr.error(title, msgBody);
  }


}
