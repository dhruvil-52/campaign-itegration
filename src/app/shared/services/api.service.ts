import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  url: string = `${environment.crmUrl}`;
  token: string = null as any;
  apiKey: string = null as any;

  constructor(public http: HttpClient) {
  }

  getUrl(type: string) {
    if (type.toLowerCase() == ("facebook").toLowerCase()) {
      return environment.facebookUrl
    } else {
      return environment.crmUrl
    }
  }

  setToken(token: any) {
    this.token = token;
  }

  setHeaders() {
    if (!!this.token) {
      try {
        let headersConfig = {
          Authorization: "Bearer " + JSON.parse(this.token)
        };
        return headersConfig;
      } catch (e) {
        let headersConfig = {
          Authorization: "Bearer " + this.token
        };
        return headersConfig;
      }
    } else {
      let token = localStorage.getItem('BrokerToken');
      if (token) {
        this.token = token;
        let headersConfig = {
          Authorization: "Bearer " + JSON.parse(this.token)
        };
        return headersConfig;
      } else {
        return {};
      }
    }
  }

  get(endpoint: string, params?: any, reqOpts?: any, showLoader: boolean = true) {
    const seq = this.http.get(this.getUrl("CRM") + '/' + endpoint, {
      headers: new HttpHeaders(),
      params: params
    });
    return seq;
  }


  getStatic(endpoint: string, params?: any, reqOpts?: any) {
    if (!reqOpts) {
      reqOpts = {
        params: new HttpParams(),
        headers: new HttpHeaders()
      };
    }
    if (params) {
      reqOpts.params = new HttpParams();
      for (let k in params) {
        reqOpts.params = reqOpts.params.set(k, params[k]);
      }
    }
    if (reqOpts) {
      reqOpts.headers = { ...reqOpts };
    }
    let seq = this.http.get(this.getUrl("CRM") + '/' + endpoint, reqOpts);
    return seq;
  }

  post(endpoint: string, body: any, reqOpts?: any) {
    if (!reqOpts) {
      reqOpts = {
        params: new HttpParams(),
        headers: new HttpHeaders()
      };
    }
    return this.http.post(this.getUrl("CRM") + '/' + endpoint, body,
      { params: reqOpts.params });
  }

  postStatic(url: string, body: any, reqOpts?: any) {
    if (!reqOpts) {
      reqOpts = {
        params: new HttpParams(),
        headers: new HttpHeaders()
      };
    }
    return this.http.post(url, body, { params: reqOpts.params, headers: reqOpts.headers });
  }

  put(endpoint: string, body: any, reqOpts?: any) {
    if (!reqOpts) {
      reqOpts = {
        params: new HttpParams()
      };
    }
    return this.http.put(this.getUrl("CRM") + '/' + endpoint, body, { params: reqOpts.params, headers: new HttpHeaders() });
  }

  delete(endpoint: string, reqOpts?: any) {
    if (!reqOpts) {
      reqOpts = {
        params: new HttpParams(),
        headers: new HttpHeaders()
      };
    }
    return this.http.delete(this.getUrl("CRM") + '/' + endpoint, { params: reqOpts.params, headers: new HttpHeaders() });
  }

  patch(endpoint: string, body: any, reqOpts?: any) {
    if (!reqOpts) {
      reqOpts = {
        params: new HttpParams(),
        headers: new HttpHeaders()
      };
    }
    return this.http.patch(this.getUrl("CRM") + '/' + endpoint, body, { params: reqOpts.params, headers: new HttpHeaders() });
  }

  getFaceBook(endpoint: string, params?: any, reqOpts?: any, showLoader: boolean = true) {
    const seq = this.http.get(this.getUrl('facebook') + '/' + endpoint);
    return seq;
  }

  postFaceBook(endpoint: string, params?: any, reqOpts?: any, showLoader: boolean = true) {
    const seq = this.http.post(this.getUrl('facebook') + '/' + endpoint, params.toString());
    return seq;
  }
}
