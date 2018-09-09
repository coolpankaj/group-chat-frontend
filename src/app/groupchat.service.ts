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

  private baseUrl = "http://localhost:3000/api/v1/users";

  constructor(private http: HttpClient) { 
    console.log("group-chat service called.")
  }

  public getUserInfoFromLocalStorage = () =>{
    return JSON.parse(localStorage.getItem('userInfo'));
  }//end of getUserInfoFromLocalStorage

  public setUserInfoInLocalStorage = (data) =>{
    localStorage.setItem('userInfo',JSON.stringify(data));
  }//end of setUserInfoInLocalStorage

  

  

  public signUpFunction(data): Observable<any> {

    const params = new HttpParams()
    .set('firstName', data.firstName)
    .set('lastName', data.lastName)
    .set('mobileNumber', data.mobileNumber)
    .set('email', data.email)
    .set('password', data.password)

  return this.http.post(`${this.baseUrl}/signup`, params)
  }


  public logInFunction(data): Observable<any> {

    const params = new HttpParams()

    .set( 'email', data.email)
    .set( 'password', data.password)

    let apiResponse = this.http.post(`${this.baseUrl}/login`, params)
    console.log(apiResponse)
    return apiResponse
  }

  public sendVerificationCode(data): Observable<any> {

    const params = new HttpParams()

      .set( 'email', data.email)
      .set ( 'authToken', data.authToken)

      let apiResponse = this.http.post(`${this.baseUrl}/sendVerificationCode`, params)

      console.log(apiResponse)

      return apiResponse
    
  }

  public resetPassword(data): Observable<any>  {
        const params = new HttpParams()
        
        .set( 'email', data.email)
        .set( 'password', data.password)
        .set( 'verificationCode', data.verificationCode)

        let apiResponse = this.http.put(`${this.baseUrl}/forgot`, params)
        return apiResponse

  }

}
