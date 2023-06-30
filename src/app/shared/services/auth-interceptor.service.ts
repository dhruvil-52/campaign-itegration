import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpEvent, HttpHandler, HttpResponse } from "@angular/common/http";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";
import { ApiService } from "./api.service";
import { AuthService } from "./auth.service";
import { ToastrService } from "ngx-toastr";

@Injectable()

export class AuthInterceptor implements HttpInterceptor {
  count: number = 0;
  postCount: number = 0;
  loadingTimer: any;

  constructor(
    private api: ApiService,
    private auth: AuthService,
    private ts: ToastrService
  ) { }

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let Token;
    let headers: any = {};
    headers = request.headers;
    try {
      this.auth.setUser()
    } catch (e) {

    }
    try {
      Token = JSON.parse(this.api.token);
    } catch (e) {
      Token = this.api.token;
    }
    request = request.clone({
      headers: request.headers.append('Authorization', 'Bearer ' + Token)
    });

    return next.handle(request).pipe(
      tap(
        event => {
        },
        err => {
          if (err.status == 401) {
            try {
              this.auth.logout();
              this.ts.error(err.error.Message, 'Fail')
            } catch (error) {
              this.auth.logout();
            }
          }
        }
      )
    );
  }
}
