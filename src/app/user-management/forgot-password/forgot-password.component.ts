import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { ToastrService } from 'ngx-toastr';
import { GroupchatService } from './../../groupchat.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from "@angular/router";

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  public email: String;
  public authToken: any;
  public userInfo: any;
  public verificationCode: any;
  public password: any;

  constructor(public toastr: ToastrService, public groupchat: GroupchatService, public cookie: CookieService, public router: Router) {
    console.log("forgot password component called.")
  }

  ngOnInit() {
    $('#newPassword').hide();
  }

  public controlView = () => {
    $('#resendMail').hide();
    $('#newPassword').show();
  }

  public sendVerificationCode = () => {


    if (!this.email) {
      this.toastr.warning("Enter Email !")
    } else {
      let data = {
        email: this.email,
      }

      this.groupchat.sendVerificationCode(data).subscribe((apiResponse) => {

        if (apiResponse.status === 200) {
          this.controlView()
          this.toastr.success("Verification Code Sent !")

        } else {
          this.toastr.error(apiResponse.message)

        }
      },
        (err) => {
          this.toastr.error("Something Went Wrong !")
        })
    }
  }



  public resetPassword = () => {
    if (!this.verificationCode) {
      this.toastr.warning("Enter Verification Code !")
    } else if (!this.password) {
      this.toastr.warning("Enter Password")
    } else {
      let data = {
        email: this.email,
        password: this.password,
        verificationCode: this.verificationCode
      }
      this.groupchat.resetPassword(data).subscribe((apiResponse) => {

        if (apiResponse.status === 200) {
          this.toastr.success("Password Changed Successfully.")

          setTimeout(() => {
            this.router.navigate(['/'])
          }, 1500);

        } else {
          this.toastr.error(apiResponse.message)
        }
      },
        (err) => {
          this.toastr.error('Something Wrong !')
        })

    }
  }

}
