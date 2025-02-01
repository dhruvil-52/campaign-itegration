import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class ControllerService {

  constructor(private api: ApiService) { }

  getUserDetailsByAccessToken(accessToken: any = {}) {
    return new Promise((resolve, reject) => {
      this.api.getFaceBook("me?fields=id,name,email,picture,first_name,last_name&access_token=" + accessToken).subscribe((data: any) => {
        if (data) {
          resolve(data)
        } else {
          reject(data);
        }
      });
    })
  }

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


  getAllForms(pageNumber = 1, pageSize = 50) {
    let reqData: any = {
      PageNumber: pageNumber,
      PageSize: pageSize
    }
    return new Promise((resolve, reject) => {
      this.api.get("CompanyMetaForm/Get", { jsondata: JSON.stringify(reqData) }).subscribe((data: any) => {
        if (data.Success) {
          resolve(data)
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
          resolve(data)
        } else {
          reject(data);
        }
      });
    })
  }

  deleteFromData(reqData: any = {}) {
    return new Promise((resolve, reject) => {
      this.api.post("CompanyMetaForm/Delete/" + reqData, {}).subscribe((data: any) => {
        if (data.Success) {
          resolve(data)
        } else {
          reject(data);
        }
      });
    })
  }

  regenerateLead(Id: number) {
    return new Promise((resolve, reject) => {
      this.api.post("MetaLeadQueue/Regenerate/" + Id, {}).subscribe((data: any) => {
        if (data.Success) {
          resolve(data.Data)
        } else {
          reject(data.Message);
        }
      });
    })
  }

  updateFromData(reqData: any = {}) {
    return new Promise((resolve, reject) => {
      this.api.post("CompanyMetaForm/Update", reqData).subscribe((data: any) => {
        if (data.Success) {
          resolve(data)
        } else {
          reject(data);
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

  fetchAllPages() {
    return new Promise((resolve, reject) => {
      this.api.get("FbMetaApi/FetchPages").subscribe((data: any) => {
        if (data) {
          resolve(data)
        } else {
          reject(data);
        }
      });
    })
  }

  fetchAllForms(pageDetails: any = {}) {
    let reqData = {
      pageId: pageDetails.Id
    }
    return new Promise((resolve, reject) => {
      this.api.get("FbMetaApi/FetchForms", reqData).subscribe((data: any) => {
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
      pageId: pageDetails.Id
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
  // subscribePage(pageDetails: any = {}) {
  //   const body = new URLSearchParams();
  //   body.set('subscribed_fields', 'leadgen');
  //   return new Promise((resolve, reject) => {
  //     this.api.postFaceBook(pageDetails.Id + "/subscribed_apps?access_token=" + pageDetails.access_token, body).subscribe((data: any) => {
  //       if (data) {
  //         resolve(data)
  //       } else {
  //         reject(data);
  //       }
  //     });
  //   })
  // }


  getAllFormsByPageId(pageDetails: any = {}) {
    let reqData = {
      pageId: pageDetails.Id
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
      formId: formDetails.Id
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


  getFormDataById(formId: any = null, userData: any = {}) {
    return new Promise((resolve, reject) => {
      this.api.get("CompanyMetaForm/Get/" + formId).subscribe((data: any) => {
        if (data && data.Success) {
          resolve(data)
        } else {
          reject(data);
        }
      });
    })
  }

  getAllLeadsByFormId(formId: any = null, userData: any = {}, pageNumber = 1, pageSize = 50) {
    let reqData = {
      PageNumber: pageNumber,
      PageSize: pageSize,
      CompanyMetaFormId: formId
    }
    return new Promise((resolve, reject) => {
      this.api.get("MetaLeadQueue/Get", { jsonData: JSON.stringify(reqData) }).subscribe((data: any) => {
        if (data) {
          resolve(data)
        } else {
          reject(data);
        }
      });
    })
  }

  getAllCampaigns() {
    return new Promise((resolve, reject) => {
      let reqData: any = {
        PageSize: 10000000,
        PageNumber: 1
      }
      this.api.get("GetCampaigns", { jsonData: JSON.stringify(reqData) }).subscribe((data: any) => {
        if (data) {
          resolve(data)
        } else {
          reject(data);
        }
      });
    })
  }

  getAllUsers() {
    return new Promise((resolve, reject) => {
      this.api.get("GetAllUser").subscribe((data: any) => {
        if (data) {
          resolve(data)
        } else {
          reject(data);
        }
      });
    })
  }

  getAllProjects(qParam = {}) {
    return new Promise((resolve, reject) => {
      this.api.get("Projects/GetListForDDL", { jsonData: JSON.stringify(qParam) }).subscribe((data: any) => {
        if (data) {
          resolve(data)
        } else {
          reject(data);
        }
      });
    })
  }
}
