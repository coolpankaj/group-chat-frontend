import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
//import { CookieService } from 'ngx-cookie-service';

//import 'rxjs/add/operator/catch';
//import 'rxjs/add/operator/do';
//import 'rxjs/add/operator/toPromise';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpErrorResponse, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GroupchatService {

  private baseUrl = "http://localhost:3000";

  constructor(private http: HttpClient) { 
    console.log("group-chat service called.")
  }

  

  public signInFunction(data): Observable<any> {

    const params = new HttpParams()

    .set( 'email', data.email)
    .set( 'password', data.password)

    return this.http.post(`${this.baseUrl}/api/v1/login`, params)
  }
}
