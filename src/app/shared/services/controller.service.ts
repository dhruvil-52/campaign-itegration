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
        "FBCredential": userData
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
}
