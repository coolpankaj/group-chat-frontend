import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { GroupchatService } from './../../groupchat.service';
import { CookieService } from 'ngx-cookie-service';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public email: String;
  public password: any;

  constructor(public router: Router, public toastr: ToastrService, public groupChat: GroupchatService, public cookie: CookieService) { 
    console.log("login component called")
  }

  ngOnInit() {
  }

  /**
   * goToLogin 
   */
  public goToLogin = () => {
    this.router.navigate(['/'])
    
  }

  /**
   * goToSignup
   */
  public goToSignup = () => {
    this.router.navigate(['/signUp'])
    
  }

  /**
   * goToForgotPassword 
   */
  public goToForgotPassword = () => {
    this.router.navigate(['/forgot-password'])
  }

  /**
   * logIn
   */
  public logIn = () => {
    if (!this.email) {
      this.toastr.warning('Please enter email !')

    } else if (!this.password) {

      this.toastr.warning('please enter password !')

    } else {
      let data = {
        email: this.email,
        password: this.password
      }

      this.groupChat.logInFunction(data).subscribe((apiResponse) => {
        
        // console.log("subscriber response"+apiResponse)

        if (apiResponse.status === 200 ) {

         
          this.cookie.set('authToken', apiResponse.data.authToken);
          this.cookie.set('receiverId', apiResponse.data.userDetails.userId);
          this.cookie.set('receiverName', apiResponse.data.userDetails.firstName + ' ' + apiResponse.data.userDetails.lastName);
          this.groupChat.setUserInfoInLocalStorage(apiResponse.data.userDetails);
          this.toastr.success(apiResponse.message)
          setTimeout(() => {
            this.router.navigate(['/defaultChatRoom'])
          }, 1500);
         
        } else  {
         
          this.toastr.error(apiResponse.message)
          
        }
      }, (err) => {
       this.toastr.error('Invalid Email / Password')
      
      });
    }
    
  }

} 