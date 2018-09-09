import { Component, OnInit } from '@angular/core';
import { Router  } from "@angular/router";
import { ToastrService } from 'ngx-toastr';
import { GroupchatService } from './../../groupchat.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  public firstName: String;
  public lastName: String;
  public mobileNumber: Number;
  public email: any;
  public password: any;

  constructor( public router: Router, public groupChat: GroupchatService, public toastr: ToastrService ) {
    console.log("signUp component called")
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

  public signUp = () => {

    if (!this.firstName) {

      this.toastr.warning("Enter First Name !")

    } else if (!this.lastName) {

      this.toastr.warning("Enter Last Name !")

    } else if (!this. mobileNumber) {

      this.toastr.warning("Enter Mobile Number !")

    } else if (!this.email) {

      this.toastr.warning("Enter Email !")

    } else if (!this.password) {

      this.toastr.warning("Enter Password !")
    } else {
      let data = {
        firstName: this.firstName,
        lastName: this.lastName,
        mobileNumber: this.mobileNumber,
        email: this.email,
        password: this.password
      }
      console.log(data)

      this.groupChat.signUpFunction(data).subscribe((apiResponse) => {
        console.log(apiResponse)

        if (apiResponse.status === 200) {

          this.toastr.success(apiResponse.message)

          setTimeout(() => {
            this.router.navigate(['/login'])
          }, 1500);
        } else {
          this.toastr.error(apiResponse.message)
        }
      }, (err) => {
        this.toastr.error('Unable To Signup', err)
      })
    }

  }
}
