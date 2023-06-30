import { EventEmitter, Injectable } from '@angular/core';
import { UserModel } from 'src/app/shared/models/user.model';
import { CrmApiService } from './crm-api.service';
import { Router } from '@angular/router';
declare var b64utoutf8: any;
declare var KJUR: any;

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  loggedInUserDetails: UserModel = new UserModel();

  constructor(private api: CrmApiService, private router: Router) { }

  login(user: any) {
    return new Promise((resolve, reject) => {
      this.api.post("Login", user, {}).subscribe((data: any) => {
        if (data.Success) {
          localStorage.setItem("BrokerToken", JSON.stringify(data.Description));
          localStorage.setItem("CompanyId", data.Data.CompanyId);
          localStorage.setItem("currency", data.Data.CompanyConfig.Currency);
          localStorage.setItem("DialCode", data.Data.CompanyConfig.DialCode);
          localStorage.setItem("ApiUidKey", data.Data.ApiUidKey);
          localStorage.setItem("RoleName", data.Data.RoleName);
          localStorage.setItem("LoginId", data.Data.LoginId);
          this.loggedInUserDetails = data.Data;
          this.loggedInUserDetails.ApiKey = data.Message;
          this.setUserJwtToken();
          this.api.apiKey = data.Message;
          this.api.token = data.Description;
          this.setUser().then(() => { })
          resolve(data.Data)
        } else {
          reject(data.Message);
        }
      });
    })
  }


  logout() {
    if (this.isActivated()) {
      this.api.post('Logout', {}).subscribe(() => {
        localStorage.clear()
        this.loggedInUserDetails = new UserModel();
        this.router.navigate(['/auth/login'])
      }, (err) => {
        localStorage.clear()
        this.loggedInUserDetails = new UserModel();
        this.router.navigate(['/auth/login'])
      })
    } else {
      this.router.navigate(['/auth/login'])
    }
  }

  isActivated() {
    if (
      localStorage.getItem("BrokerToken") != null
    ) {
      return true;
    } else {
      return false;
    }
  }

  setUser() {
    this.getDecryptedToken();
    let onGetUser = new Promise((res, rej) => {
      this.getDecryptedToken();
      let Token = localStorage.getItem('BrokerToken');
      if (!!Token) {
        this.api.token = JSON.parse(Token);
        this.api.apiKey = this.loggedInUserDetails.ApiKey;
        res(this.loggedInUserDetails.Name);
      }
      rej();
    });
    return onGetUser;
  }

  setUserJwtToken() {
    let oHeader = { alg: "HS256" };
    let sHeader = JSON.stringify(oHeader);
    let sPayload = JSON.stringify(this.loggedInUserDetails);
    let sJWS = KJUR.jws.JWS.sign("HS256", sHeader, sPayload, "121989");
    localStorage.setItem("JWTToken", JSON.stringify(sJWS));
  }

  getDecryptedToken() {
    let token: any = localStorage.getItem('JWTToken');
    var isValid = KJUR.jws.JWS.verifyJWT(JSON.parse(token), "121989",
      { alg: ['HS256'] });
    if (!isValid) {
      this.logout();
    }
    if (!!token) {
      this.loggedInUserDetails = KJUR.jws.JWS.readSafeJSONString(b64utoutf8(token.split(".")[1]));
    }
  }

}
