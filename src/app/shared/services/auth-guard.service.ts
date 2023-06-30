import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard {
  constructor(private auth: AuthService, private router: Router) {
  }

  canActivate() {
    if (this.auth.isActivated()) {
      return true;
    } else {
      this.router.navigate(['/auth/login']);
    };
  }

  canLoad() {
    if (this.auth.isActivated()) {
      return true;
    } else {
      this.router.navigate(['/auth/login']);
    };
  }
}
