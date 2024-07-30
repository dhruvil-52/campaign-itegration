import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ControllerService } from 'src/app/shared/services/controller.service';
import { FacebookLoginProvider, SocialAuthService } from '@abacritt/angularx-social-login';

@Component({
  selector: 'app-integration',
  templateUrl: './integration.component.html',
  styleUrls: ['./integration.component.scss']
})
export class IntegrationComponent implements OnInit {
  user: any;
  loggedIn: any;

  constructor(
    private controllerService: ControllerService,
    private ts: ToastrService,
    private authService: SocialAuthService) { }

  signInWithFB(): void {
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);
  }

  signOutFromFB(): void {
    this.authService.signOut();
  }

  ngOnInit() {
    this.authService.authState.subscribe((user) => {
      this.user = user;
      this.loggedIn = (user != null);
      console.log("user", JSON.stringify(this.user));
      localStorage.setItem('loggedInUserDetails', JSON.stringify(this.user));
      this.controllerService.integrate(this.user).then((response) => {
        console.log("response", response)
      }).catch((error) => {
        this.ts.error(`Error While Integrate to Facebook`, 'Error')
      })
    });
  }
}
