import { Component, OnInit } from '@angular/core';
import { AuthService } from './shared/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {

  constructor(
    private auth: AuthService,
    private router: Router) { }

  ngOnInit(): void {
    if (this.auth.isActivated()) {
      this.auth.setUser();
    } else {
      this.router.navigate(["/auth/login"]);
    }
  }
}
