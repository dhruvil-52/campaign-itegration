import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ControllerService } from './controller.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  user: any = {};

  constructor(
    private controllerService: ControllerService,
    private ts: ToastrService) { }

  getLoggedInUser() {
    console.log("16",localStorage.getItem('loggedInUserDetails'))
    if (!localStorage.getItem('loggedInUserDetails')) {
      console.log("17")
      this.getLoggedInUserDetails();
    } else {
      console.log("20")
      let userData: any = localStorage.getItem('loggedInUserDetails');
      this.user = JSON.parse(userData);
    }
  }

  getLoggedInUserDetails() {
    this.controllerService.getLoggedInUserDetails().then((data: any) => {
      console.log("loggedIn user data", data)
      if (data.RawCredential) {
        this.user = JSON.parse(data.RawCredential);
        localStorage.setItem('loggedInUserDetails', JSON.stringify(this.user));
        return this.user;
      } else {
        return null;
      }
    }, (error) => {
      this.ts.info(`We can't get your Data, Please Integrate with Facebook`, 'Info')
    })
  }
}
