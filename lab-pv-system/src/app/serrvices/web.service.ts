import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class WebService {

  base_url: string = "http://192.168.0.108:3000/"
  //base_url: string = "http://192.168.100.72:3000/"

  constructor(public http: HttpClient) { }

  getLabInfo(): Observable<any>{
    let headers = new HttpHeaders();
    return this.http.get(this.base_url+'api/lab/', {
      headers: headers
    });
  }

  getMachineInfo(): Observable<any>{
    let headers = new HttpHeaders();
    return this.http.get(this.base_url+'api/machine-info/', {
      headers: headers
    });
  }

  getPvInfo(): Observable<any>{
    let headers = new HttpHeaders();
    return this.http.get(this.base_url+'api/pv-info/', {
      headers: headers
    });
  }


  getEgcrInfo(): Observable<any>{
    let headers = new HttpHeaders();
    return this.http.get(this.base_url+'api/egcr-info/', {
      headers: headers
    });
  }


  sendNotification(title: string, body_: string): Observable<any>{
    let headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    let body = JSON.stringify({"title": title, "body": body_});
    return this.http.post(this.base_url+'api/send-notification' , body, {
      headers: headers
    });
  }

  updatePvInfo(pv: any): Observable<any>{
    let headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    let body = JSON.stringify(pv);
    return this.http.post(this.base_url+'api/pv-info/update' , body, {
      headers: headers
    });
  }

}
