import { Component, OnInit } from '@angular/core';
import { AuthService } from './shared/services/auth.service';
import { Router } from '@angular/router';
import { UserService } from './shared/services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {

  constructor(
    private auth: AuthService,
    private router: Router,
    private userService: UserService) {
    if (this.auth.isActivated()) {
      this.userService.getLoggedInUser();
    }
  }

  ngOnInit(): void {
    if (this.auth.isActivated()) {
      this.auth.setUser();
    } else {
      this.router.navigate(["/auth/login"]);
    }
  }
}
