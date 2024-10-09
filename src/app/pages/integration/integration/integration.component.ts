import { Component, OnInit, NgZone } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ControllerService } from 'src/app/shared/services/controller.service';
import { UserService } from 'src/app/shared/services/user.service';
import { environment } from 'src/environments/environment';
declare const FB: any;

@Component({
  selector: 'app-integration',
  templateUrl: './integration.component.html',
  styleUrls: ['./integration.component.scss']
})
export class IntegrationComponent implements OnInit {
  user: any;

  constructor(
    private controllerService: ControllerService,
    private ts: ToastrService,
    public userService: UserService,
    private zone: NgZone) { }

  ngOnInit(): void {
    console.log(environment.facebookAppId)
  }

  signInWithFB() {
    FB.login((result: any) => {
      this.user = result.authResponse ? result.authResponse : result;
      console.log("On SignIn User Data", JSON.stringify(this.user));
      this.zone.run(() => {
        if (!!Object.keys(this.user).length) {
          this.processDataAfterLoggeIn();
        }
      });
    }, { scope: 'email' })
  }

  processDataAfterLoggeIn() {
    this.controllerService.getUserDetailsByAccessToken(this.user.accessToken).then((userData: any) => {
      console.log("user Data", JSON.stringify(userData));

      let reqData: any = {};
      reqData.id = userData.id;
      reqData.name = userData.name;
      reqData.email = userData.email;
      reqData.firstName = userData.first_name;
      reqData.lastName = userData.last_name;
      reqData.authToken = this.user.accessToken;
      reqData.photoUrl = "";
      reqData.provider = "FACEBOOK";
      reqData.response = {
        "name": userData.name,
        "email": userData.email,
        "picture": userData.picture,
        "first_name": userData.first_name,
        "last_name": userData.last_name,
        "id": userData.id
      };

      this.controllerService.integrate(reqData).then((response) => {
        console.log("response", response);
        this.userService.getLoggedInUserDetails();
      }, ((error) => {
        console.error(error)
        this.ts.error(`Error While Integrate to Facebook`, 'Error')
      }))
    }, ((error) => {
      console.error(error)
      this.ts.error(`Error While Integrate to Facebook`, 'Error')
    }))
  }
}
