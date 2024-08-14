import { Component } from '@angular/core';
import { AuthService } from '../../../shared/services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class AppSideLoginComponent {
  user: { Username: string, Password: string } = { Username: '', Password: '' };
  showPassword = false;

  constructor(
    private authService: AuthService,
    private ts: ToastrService,
    private router: Router,
    private userService: UserService) { }

  login() {
    this.authService.login(this.user).then((response: any) => {
      this.userService.getLoggedInUserDetails();
      this.router.navigate(["/"]);
    }).catch((e: any) => {
      this.ts.error(e, 'Login');
    });
  }
}
