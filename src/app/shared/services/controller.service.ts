import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class ControllerService {

  constructor(private api: ApiService) { }

  integrate(userData: any = {}) {
    return new Promise((resolve, reject) => {
      let reqData = {
        "Type": "automation",
        "Code": "facebook",
        "IsActive": true,
        "Credential": {},
        "RawCredential": userData
      }
      this.api.post("SaveCompanyCredential", reqData).subscribe((data: any) => {
        if (data.Success) {
          resolve(data.Data)
        } else {
          reject(data.Message);
        }
      });
    })
  }

  getLoggedInUserDetails() {
    return new Promise((resolve, reject) => {
      let reqData = {
        "type": "automation",
        "code": "facebook"
      }
      this.api.get("GetCompanyCredentialByCompany", reqData).subscribe((data: any) => {
        if (data.Success) {
          resolve(data.Data)
        } else {
          reject(data.Message);
        }
      });
    })
  }


  getAllForms() {
    return new Promise((resolve, reject) => {
      let reqData = {
        "type": "automation",
        "code": "facebook"
      }
      this.api.get("", reqData).subscribe((data: any) => {
        if (data.Success) {
          resolve(data.Data)
        } else {
          reject(data.Message);
        }
      });
    })
  }

  getAllPages(loggedInUserDetails: any = {}) {
    return new Promise((resolve, reject) => {
      this.api.getFaceBook("me/accounts?access_token=" + loggedInUserDetails.authToken).subscribe((data: any) => {
        if (data) {
          resolve(data)
        } else {
          reject(data);
        }
      });
    })
  }

  subscribePage(pageDetails: any = {}) {
    const body = new URLSearchParams();
    body.set('subscribed_fields', 'leadgen');
    return new Promise((resolve, reject) => {
      this.api.postFaceBook(pageDetails.id + "/subscribed_apps?access_token=" + pageDetails.access_token, body).subscribe((data: any) => {
        if (data) {
          resolve(data)
        } else {
          reject(data);
        }
      });
    })
  }


  getAllFormsByPageId(pageDetails: any = {}) {
    return new Promise((resolve, reject) => {
      this.api.getFaceBook(pageDetails.id + "/leadgen_forms?access_token=" + pageDetails.access_token).subscribe((data: any) => {
        if (data) {
          resolve(data)
        } else {
          reject(data);
        }
      });
    })
  }

  getFormDataByFormId(formDetails: any = {}, pageDetails: any = {}) {
    return new Promise((resolve, reject) => {
      this.api.getFaceBook(formDetails.id + "?access_token=" + pageDetails.access_token + '&fields=questions').subscribe((data: any) => {
        if (data) {
          resolve(data)
        } else {
          reject(data);
        }
      });
    })
  }
}
