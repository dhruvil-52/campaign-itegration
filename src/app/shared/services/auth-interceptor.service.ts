import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpEvent, HttpHandler, HttpResponse } from "@angular/common/http";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";
import { AuthService } from "./auth.service";
import { ToastrService } from "ngx-toastr";
import { NgxUiLoaderService } from "ngx-ui-loader";

@Injectable()

export class AuthInterceptor implements HttpInterceptor {
  count = 0;

  constructor(
    private auth: AuthService,
    private ts: ToastrService,
    private ngxLoader: NgxUiLoaderService
  ) { }

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let Token;
    let headers: any = {};
    headers = request.headers;

    try {
      let _Token = localStorage.getItem('BrokerToken');
      if (!!_Token) {
        Token = JSON.parse(_Token);
      }
    } catch (error) {
      Token = '';
    }

    if (this.needToPassAuthorizationToken(request.url)) {
      request = request.clone({
        headers: request.headers.append('Authorization', 'Bearer ' + Token)
      });
    }
    this.count++;
    if (this.count == 1) {
      this.ngxLoader.start();
    }
    return next.handle(request).pipe(
      tap(
        event => {
          if (event instanceof HttpResponse) {
            this.count--;
            if (this.count == 0) {
              this.ngxLoader.stop();
            }
          }
        },
        err => {
          this.count--;
          if (this.count == 0) {
            this.ngxLoader.stop();
          }
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

  //  only for crm we have to pass Authorization token
  needToPassAuthorizationToken(url: string) {
    let lastIndex = url.lastIndexOf('/');
    let endpoint = url.substring(lastIndex + 1, url.length);
    if (endpoint.toLowerCase() == ("Login").toLowerCase()) {
      return false;
    } else {
      return true;
    }
  }
}
