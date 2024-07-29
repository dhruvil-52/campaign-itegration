import {
  Component,
  Output,
  EventEmitter,
  Input,
  ViewEncapsulation,
} from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
    `.topbar{
      box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.25);;
    }`
  ],
  encapsulation: ViewEncapsulation.None,
})
export class HeaderComponent {
  @Output() toggleMobileNav = new EventEmitter<void>();

  constructor(
    public authService: AuthService) { }

}
