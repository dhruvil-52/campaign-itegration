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


  getAllForms(reqData: any = {}) {
    return new Promise((resolve, reject) => {
      this.api.get("CompanyMetaForm/Get", { jsondata: JSON.stringify(reqData) }).subscribe((data: any) => {
        if (data.Success) {
          resolve(data.Data)
        } else {
          reject(data.Message);
        }
      });
    })
  }

  addFromData(reqData: any = {}) {
    return new Promise((resolve, reject) => {
      this.api.post("CompanyMetaForm/Create", reqData).subscribe((data: any) => {
        if (data.Success) {
          resolve(data.Data)
        } else {
          reject(data.Message);
        }
      });
    })
  }

  getAllPages() {
    return new Promise((resolve, reject) => {
      this.api.get("FbMetaApi/GetPages").subscribe((data: any) => {
        if (data) {
          resolve(data)
        } else {
          reject(data);
        }
      });
    })
  }

  subscribePage(pageDetails: any = {}) {
    let reqData = {
      PageId: pageDetails.id,
      AccessToken: pageDetails.access_token
    }
    return new Promise((resolve, reject) => {
      this.api.get("FbMetaApi/GetSubscribedAppsByPage", reqData).subscribe((data: any) => {
        if (data) {
          resolve(data)
        } else {
          reject(data);
        }
      });
    })
  }


  getAllFormsByPageId(pageDetails: any = {}) {
    let reqData = {
      PageId: pageDetails.id,
      AccessToken: pageDetails.access_token
    }
    return new Promise((resolve, reject) => {
      this.api.get("FbMetaApi/GetForms", reqData).subscribe((data: any) => {
        if (data) {
          resolve(data)
        } else {
          reject(data);
        }
      });
    })
  }

  getFormDataByFormId(formDetails: any = {}, pageDetails: any = {}) {
    let reqData = {
      FormId: formDetails.id,
      AccessToken: pageDetails.access_token
    }
    return new Promise((resolve, reject) => {
      this.api.get("FbMetaApi/GetFormData", reqData).subscribe((data: any) => {
        if (data) {
          resolve(data)
        } else {
          reject(data);
        }
      });
    })
  }


  getAllLeadsByFormId(formId: any = null, userData: any = {}) {
    let reqData = {
      FormId: formId
    }
    return new Promise((resolve, reject) => {
      this.api.get("FbMetaApi/GetLeadsByForm", reqData).subscribe((data: any) => {
        if (data) {
          resolve(data)
        } else {
          reject(data);
        }
      });
    })
  }
}
