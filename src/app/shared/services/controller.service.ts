import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class ControllerService {

  constructor(private api: ApiService) { }

  integrate(type: any) {
    return new Promise((resolve, reject) => {
      let object = {
        type: type
      }
      this.api.post("integration", object).subscribe((data: any) => {
        if (data.Success) {
          resolve(data.Data)
        } else {
          reject(data.Message);
        }
      });
    })
  }
}
