import { Component, OnDestroy, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ControllerService } from 'src/app/shared/services/controller.service';
import { Subscription } from 'rxjs';
import { FacebookLoginProvider, SocialAuthService } from '@abacritt/angularx-social-login';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-integration',
  templateUrl: './integration.component.html',
  styleUrls: ['./integration.component.scss']
})
export class IntegrationComponent implements OnInit, OnDestroy {
  user: any;
  loggedIn: any;
  facebookSubscription: Subscription;

  constructor(
    private controllerService: ControllerService,
    private ts: ToastrService,
    private authService: SocialAuthService,
    public userService: UserService) { }

  signInWithFB(): void {
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);
  }

  signOutFromFB(): void {
    this.authService.signOut();
  }

  ngOnInit() {
    console.log("33")
    this.facebookSubscription = this.authService.authState.subscribe((user) => {
      this.user = user;
      this.loggedIn = (user != null);
      console.log("user", JSON.stringify(this.user));
      this.controllerService.integrate(this.user).then((response) => {
        console.log("response", response);
        this.userService.getLoggedInUserDetails();
      }).catch((error) => {
        this.ts.error(`Error While Integrate to Facebook`, 'Error')
      })
    })
  }

  ngOnDestroy(): void {
    console.log("called destroy")
    if (!!this.facebookSubscription) {
      this.facebookSubscription.unsubscribe();
    }
  }
}
